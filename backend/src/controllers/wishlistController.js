const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

// @desc    Get user wishlist
// @route   GET /api/v1/wishlist
// @access  Private
exports.getWishlist = async (req, res, next) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id })
      .populate('items', 'name price salePrice images averageRating stock slug');
    
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user.id, items: [] });
    }

    res.status(200).json({ success: true, count: wishlist.items.length, data: wishlist.items });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle product in wishlist
// @route   POST /api/v1/wishlist/toggle
// @access  Private
exports.toggleWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body;
    
    if (!productId) {
      return res.status(400).json({ success: false, message: 'Product ID is required' });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({ success: false, message: 'Product not found or inactive' });
    }

    let wishlist = await Wishlist.findOne({ user: req.user.id });
    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user.id, items: [] });
    }

    const index = wishlist.items.indexOf(productId);
    let message = '';
    
    if (index > -1) {
      // Exists, remove it
      wishlist.items.splice(index, 1);
      message = 'Product removed from wishlist';
    } else {
      // Doesn't exist, add it
      wishlist.items.push(productId);
      message = 'Product added to wishlist';
    }

    await wishlist.save();
    
    res.status(200).json({ success: true, message, data: { wishlistCount: wishlist.items.length } });
  } catch (error) {
    next(error);
  }
};
