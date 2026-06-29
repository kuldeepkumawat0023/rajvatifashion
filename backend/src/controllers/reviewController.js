const Review = require('../models/Review');
const Order = require('../models/Order');

// @desc    Add review
// @route   POST /api/v1/reviews
// @access  Private
exports.addReview = async (req, res, next) => {
  try {
    const { product, rating, comment } = req.body;

    // Check if user has actually purchased this product
    const hasPurchased = await Order.findOne({
      user: req.user.id,
      'items.product': product,
      status: 'Delivered'
    });

    if (!hasPurchased) {
      return res.status(403).json({ success: false, message: 'You can only review products you have purchased and received.' });
    }

    const review = await Review.create({
      product,
      user: req.user.id,
      rating,
      comment
    });

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    // 11000 is Mongo error code for duplicate key
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'You have already reviewed this product' });
    }
    next(error);
  }
};

// @desc    Get reviews for a product
// @route   GET /api/v1/reviews/:productId
// @access  Public
exports.getProductReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ product: req.params.productId, isActive: true })
      .populate('user', 'fullname profilePhoto')
      .sort('-createdAt');

    res.status(200).json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    next(error);
  }
};

// @desc    Soft Delete review
// @route   DELETE /api/v1/reviews/:id
// @access  Private (Admin or Review Owner)
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    // Check ownership or admin status
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin' && req.user.role !== 'super_admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this review' });
    }

    review.isActive = false;
    await review.save(); // Will trigger average rating recalculation!

    res.status(200).json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    next(error);
  }
};
