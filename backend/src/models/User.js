const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  countryCode: { type: String, default: '+91' },
  phoneNumber: { type: String },
  role: { type: String, enum: ['user', 'admin', 'super_admin'], default: 'user' },
  adminRole: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminRole' },
  isActive: { type: Boolean, default: true },
  isOtpVerified: { type: Boolean, default: false },
  otp: { type: String },
  otpExpiry: { type: Date },
  avatar: { type: String }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
