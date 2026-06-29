const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
  addReview,
  getProductReviews,
  deleteReview
} = require('../controllers/reviewController');

router.get('/product/:productId', getProductReviews);

router.use(protect);
router.post('/add', addReview);
router.delete('/delete/:id', deleteReview);

module.exports = router;