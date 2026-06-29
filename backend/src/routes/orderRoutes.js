const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const requirePermission = require('../middleware/requirePermission');
const { ADMIN_PERMISSIONS } = require('../config/permissions');

const {
  createOrder,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderStatus,
  deleteOrder
} = require('../controllers/orderController');

router.use(protect);

// Customer routes
router.post('/add', createOrder);
router.get('/myorders', getMyOrders);
router.get('/single/:id', getOrderById);

// Admin routes
router.use(requirePermission(ADMIN_PERMISSIONS.MANAGE_ORDERS));
router.get('/all', getOrders);
router.put('/update-status/:id', updateOrderStatus);
router.delete('/delete/:id', deleteOrder);

module.exports = router;