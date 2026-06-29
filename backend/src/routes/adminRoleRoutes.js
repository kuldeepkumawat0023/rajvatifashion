const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const requirePermission = require('../middleware/requirePermission');
const { ADMIN_PERMISSIONS } = require('../config/permissions');

const {
  getAdminRoles,
  getAdminRole,
  createAdminRole,
  updateAdminRole,
  deleteAdminRole,
  inviteAdmin
} = require('../controllers/adminRoleController');

router.use(protect);
// Only super admins can manage roles usually, or specific MANAGE_ROLES permission.
// For now, let's assume MANAGE_USERS permission can manage roles.
router.use(requirePermission(ADMIN_PERMISSIONS.MANAGE_USERS));

router.get('/all', getAdminRoles);
router.get('/single/:id', getAdminRole);
router.post('/add', createAdminRole);
router.put('/update/:id', updateAdminRole);
router.delete('/delete/:id', deleteAdminRole);
router.post('/invite', inviteAdmin);

module.exports = router;
