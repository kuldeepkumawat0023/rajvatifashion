const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect } = require('../middleware/authMiddleware');
const requirePermission = require('../middleware/requirePermission');
const { ADMIN_PERMISSIONS } = require('../config/permissions');

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProductImage
} = require('../controllers/productController');

// Public routes
router.get('/all', getProducts);
router.get('/single/:identifier', getProduct);

// Admin routes
router.use(protect);
router.use(requirePermission(ADMIN_PERMISSIONS.MANAGE_PRODUCTS));

// Accept up to 5 images for a product
router.post('/add', upload.array('images', 5), createProduct);
router.put('/update/:id', upload.array('images', 5), updateProduct);
router.delete('/delete/:id', deleteProduct);
router.delete('/delete-image/:id', deleteProductImage);

module.exports = router;