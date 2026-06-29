const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // If user is null, it can be treated as a global/broadcast notification
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Order', 'Promotion', 'Alert', 'System'],
    default: 'Alert'
  },
  isRead: {
    type: Boolean,
    default: false
  },
  actionUrl: {
    type: String,
    // e.g., '/account/orders/12345'
  }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
