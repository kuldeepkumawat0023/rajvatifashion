const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const productRoutes = require('./productRoutes');
const orderRoutes = require('./orderRoutes');
const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes');
const paymentRoutes = require('./paymentRoutes');
const couponRoutes = require('./couponRoutes');
const reviewRoutes = require('./reviewRoutes');
const cartRoutes = require('./cartRoutes');
const adminRoleRoutes = require('./adminRoleRoutes');
const wishlistRoutes = require('./wishlistRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const addressRoutes = require('./addressRoutes');
const notificationRoutes = require('./notificationRoutes');

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/payments', paymentRoutes);
router.use('/coupons', couponRoutes);
router.use('/reviews', reviewRoutes);
router.use('/cart', cartRoutes);
router.use('/admin-roles', adminRoleRoutes);
router.use('/wishlist', wishlistRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/addresses', addressRoutes);
router.use('/notifications', notificationRoutes);

module.exports = router;
