const razorpay = require('../config/razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');
const Transaction = require('../models/Transaction');

// @desc    Create Razorpay Order
// @route   POST /api/v1/payments/create-order
// @access  Private
exports.createRazorpayOrder = async (req, res, next) => {
  try {
    const { orderId } = req.body;
    
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    
    // Amount in paisa
    const amount = Math.round(order.total * 100);
    
    const options = {
      amount,
      currency: 'INR',
      receipt: `receipt_${order.orderId}`
    };
    
    const rzpOrder = await razorpay.orders.create(options);
    
    order.razorpayOrderId = rzpOrder.id;
    await order.save();
    
    res.status(200).json({ success: true, data: rzpOrder });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify Payment Signature
// @route   POST /api/v1/payments/verify
// @access  Private
exports.verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;
    
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'dummy_secret')
      .update(body.toString())
      .digest('hex');
      
    if (expectedSignature === razorpay_signature) {
      const order = await Order.findById(orderId);
      if (order) {
        order.paymentStatus = 'Paid';
        order.razorpayPaymentId = razorpay_payment_id;
        await order.save();

        // Save Transaction Record
        await Transaction.create({
          razorpayPaymentId: razorpay_payment_id,
          razorpayOrderId: razorpay_order_id,
          order: order._id,
          user: order.user,
          amount: order.total
        });

        return res.status(200).json({ success: true, message: 'Payment verified successfully' });
      }
    }
    
    res.status(400).json({ success: false, message: 'Payment verification failed' });
  } catch (error) {
    next(error);
  }
};
