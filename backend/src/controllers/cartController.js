const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Get user cart
// @route   GET /api/v1/cart
// @access  Private
exports.getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate('items.product', 'name price salePrice images stock');
    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};

// @desc    Add or update item in cart
// @route   POST /api/v1/cart
// @access  Private
exports.addToCart = async (req, res, next) => {
  try {
    const { product, size, qty } = req.body;

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    const itemIndex = cart.items.findIndex(p => p.product.toString() === product && p.size === size);

    if (itemIndex > -1) {
      // Product exists, update quantity
      cart.items[itemIndex].qty += qty;
    } else {
      // New product, add it
      cart.items.push({ product, size, qty });
    }

    await cart.save();
    
    // Populate before sending
    await cart.populate('items.product', 'name price salePrice images stock');

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/v1/cart/:itemId
// @access  Private
exports.removeFromCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

    cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);
    await cart.save();

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};

// @desc    Clear cart
// @route   DELETE /api/v1/cart
// @access  Private
exports.clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};
