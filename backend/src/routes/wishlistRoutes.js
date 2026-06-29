const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
  getWishlist,
  toggleWishlist
} = require('../controllers/wishlistController');

router.use(protect);

router.get('/view', getWishlist);
router.post('/toggle', toggleWishlist);

module.exports = router;
