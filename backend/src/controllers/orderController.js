const Order = require('../models/Order');

// @desc    Create new order
// @route   POST /api/v1/orders
// @access  Private
exports.createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress, paymentMethod, couponCode, subtotal, discount, shipping, total } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No order items' });
    }

    const order = new Order({
      user: req.user.id,
      items,
      shippingAddress,
      paymentMethod,
      couponCode,
      subtotal,
      discount,
      shipping,
      total
    });

    const createdOrder = await order.save();
    res.status(201).json({ success: true, data: createdOrder });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user orders
// @route   GET /api/v1/orders/myorders
// @access  Private
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id, isActive: true }).sort('-createdAt');
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

// @desc    Get order by ID
// @route   GET /api/v1/orders/:id
// @access  Private
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'fullname email');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    
    // Check if user is admin or the order belongs to them
    if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin' && req.user.role !== 'super_admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to view this order' });
    }
    
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/v1/orders
// @access  Private/Admin
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ isActive: true }).populate('user', 'fullname').sort('-createdAt');
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status
// @route   PUT /api/v1/orders/:id/status
// @access  Private/Admin
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status, trackingId, deliveryDate } = req.body;
    const order = await Order.findById(req.params.id);
    
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    
    order.status = status;
    if (trackingId) order.trackingId = trackingId;
    if (deliveryDate) order.deliveryDate = deliveryDate;
    
    await order.save();
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// @desc    Soft Delete order
// @route   DELETE /api/v1/orders/:id
// @access  Private/Admin
exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    
    order.isActive = false;
    await order.save();
    
    res.status(200).json({ success: true, message: 'Order soft-deleted successfully' });
  } catch (error) {
    next(error);
  }
};
