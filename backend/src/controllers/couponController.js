const Coupon = require('../models/Coupon');

// @desc    Get all coupons (Admin)
// @route   GET /api/v1/coupons
// @access  Private/Admin
exports.getCoupons = async (req, res, next) => {
  try {
    const coupons = await Coupon.find({ isActive: true }).sort('-createdAt');
    res.status(200).json({ success: true, count: coupons.length, data: coupons });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a coupon (Admin)
// @route   POST /api/v1/coupons
// @access  Private/Admin
exports.createCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.status(201).json({ success: true, data: coupon });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify and Apply Coupon (User)
// @route   POST /api/v1/coupons/apply
// @access  Private
exports.applyCoupon = async (req, res, next) => {
  try {
    const { code, cartTotal } = req.body;
    
    if (!code || !cartTotal) {
      return res.status(400).json({ success: false, message: 'Please provide coupon code and cart total' });
    }

    const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });
    
    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Invalid or expired coupon' });
    }

    const now = new Date();
    if (now < coupon.validFrom || now > coupon.validUntil) {
      return res.status(400).json({ success: false, message: 'Coupon is not active currently' });
    }

    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({ success: false, message: 'Coupon usage limit reached' });
    }

    if (cartTotal < coupon.minOrderValue) {
      return res.status(400).json({ 
        success: false, 
        message: `Minimum order value for this coupon is ₹${coupon.minOrderValue}` 
      });
    }

    let discountAmount = 0;
    if (coupon.discountType === 'Percentage') {
      discountAmount = (cartTotal * coupon.discountValue) / 100;
      if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
        discountAmount = coupon.maxDiscount;
      }
    } else {
      discountAmount = coupon.discountValue;
    }

    res.status(200).json({ 
      success: true, 
      data: {
        discountAmount,
        finalTotal: cartTotal - discountAmount,
        code: coupon.code
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Soft Delete coupon (Admin)
// @route   DELETE /api/v1/coupons/:id
// @access  Private/Admin
exports.deleteCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) return res.status(404).json({ success: false, message: 'Coupon not found' });
    
    coupon.isActive = false;
    await coupon.save();
    
    res.status(200).json({ success: true, message: 'Coupon soft-deleted successfully' });
  } catch (error) {
    next(error);
  }
};
