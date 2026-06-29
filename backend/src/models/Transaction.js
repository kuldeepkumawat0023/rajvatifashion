const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  razorpayPaymentId: { type: String, required: true },
  razorpayOrderId: { type: String, required: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  status: { type: String, enum: ['Success', 'Failed', 'Refunded'], default: 'Success' },
  paymentMethod: { type: String, default: 'Online' },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
