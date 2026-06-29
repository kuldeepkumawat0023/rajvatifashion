const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: String,
  image: String,
  size: String,
  qty: Number,
  price: Number,
});

const orderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  guestInfo: { name: String, email: String, phone: String },
  items: [orderItemSchema],
  shippingAddress: {
    street: String, city: String, state: String, pincode: String,
  },
  paymentMethod: { type: String, enum: ['COD', 'Online'], default: 'COD' },
  paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  status: {
    type: String,
    enum: ['Placed', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Placed',
  },
  subtotal: Number,
  discount: { type: Number, default: 0 },
  shipping: { type: Number, default: 0 },
  total: Number,
  couponCode: String,
  trackingId: String,
  deliveryDate: Date,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Auto-generate order ID
orderSchema.pre('save', async function(next) {
  if (!this.orderId) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderId = `RJV${Date.now().toString().slice(-6)}${count + 1}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
