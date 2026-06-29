const mongoose = require('mongoose');
const { PERMISSION_LIST } = require('../config/permissions');

const adminRoleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  permissions: [{
    type: String,
    enum: PERMISSION_LIST,
  }],
  isDefault: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isActive: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('AdminRole', adminRoleSchema);
