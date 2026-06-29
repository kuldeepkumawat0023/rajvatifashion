const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const requirePermission = require('../middleware/requirePermission');
const { ADMIN_PERMISSIONS } = require('../config/permissions');

const {
  getUserProfile,
  updateUserProfile,
  updatePassword,
  uploadAvatar,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');

// All routes are protected (must be logged in)
router.use(protect);

// ----------------------------------------------------
// CUSTOMER (SELF) ROUTES
// ----------------------------------------------------
router.get('/me', getUserProfile);
router.put('/me', updateUserProfile);
router.put('/me/password', updatePassword);

// TODO: Link upload middleware from src/middleware/upload.js here
router.post('/me/avatar', uploadAvatar);

// ----------------------------------------------------
// ADMIN ROUTES (Requires MANAGE_USERS permission)
// ----------------------------------------------------
router.use(requirePermission(ADMIN_PERMISSIONS.MANAGE_USERS));

router.get('/all', getAllUsers);
router.get('/single/:id', getUserById);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

module.exports = router;