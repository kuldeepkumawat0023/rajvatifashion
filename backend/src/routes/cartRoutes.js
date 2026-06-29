const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
  getCart,
  addToCart,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');

router.use(protect);

router.get('/view', getCart);
router.post('/add', addToCart);
router.delete('/remove/:itemId', removeFromCart);
router.delete('/clear', clearCart);

module.exports = router;
