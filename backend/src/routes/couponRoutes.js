const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const requirePermission = require('../middleware/requirePermission');
const { ADMIN_PERMISSIONS } = require('../config/permissions');

const {
  getCoupons,
  createCoupon,
  applyCoupon,
  deleteCoupon
} = require('../controllers/couponController');

router.use(protect);

// User route
router.post('/apply', applyCoupon);

// Admin routes
router.use(requirePermission(ADMIN_PERMISSIONS.MANAGE_COUPONS));
router.get('/all', getCoupons);
router.post('/add', createCoupon);
router.delete('/delete/:id', deleteCoupon);

module.exports = router;