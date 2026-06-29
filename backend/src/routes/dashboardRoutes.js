const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const requirePermission = require('../middleware/requirePermission');
const { ADMIN_PERMISSIONS } = require('../config/permissions');

const { getDashboardStats } = require('../controllers/dashboardController');

router.use(protect);
// Assume admins with MANAGE_ORDERS can view dashboard
router.use(requirePermission(ADMIN_PERMISSIONS.MANAGE_ORDERS));

router.get('/stats', getDashboardStats);

module.exports = router;
