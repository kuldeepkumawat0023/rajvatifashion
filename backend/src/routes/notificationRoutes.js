const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const requirePermission = require('../middleware/requirePermission');
const { ADMIN_PERMISSIONS } = require('../config/permissions');

const {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  createBroadcast
} = require('../controllers/notificationController');

// All routes require user to be logged in
router.use(protect);

// Customer Routes
router.get('/my', getMyNotifications);
router.put('/mark-read/:id', markAsRead);
router.put('/mark-all-read', markAllAsRead);
router.delete('/delete/:id', deleteNotification);

// Admin Routes (for promos/broadcasts)
// Using MANAGE_ORDERS permission as a placeholder for general admin capability
router.use(requirePermission(ADMIN_PERMISSIONS.MANAGE_ORDERS));
router.post('/broadcast', createBroadcast);

module.exports = router;
