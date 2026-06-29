const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect } = require('../middleware/authMiddleware');
const requirePermission = require('../middleware/requirePermission');
const { ADMIN_PERMISSIONS } = require('../config/permissions');

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');

// Public routes
router.get('/all', getCategories);
router.get('/single/:identifier', getCategory);

// Admin routes
router.use(protect);
router.use(requirePermission(ADMIN_PERMISSIONS.MANAGE_CATEGORIES));

router.post('/add', upload.single('image'), createCategory);
router.put('/update/:id', upload.single('image'), updateCategory);
router.delete('/delete/:id', deleteCategory);

module.exports = router;