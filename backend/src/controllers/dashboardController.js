const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

// @desc    Get dashboard stats
// @route   GET /api/v1/dashboard/stats
// @access  Private/Admin
exports.getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments({ isActive: true });
    const totalProducts = await Product.countDocuments({ isActive: true });
    
    const orders = await Order.find({ isActive: true, status: { $ne: 'Cancelled' } });
    const totalOrders = orders.length;
    
    const totalSales = orders.reduce((sum, order) => {
      // Only count paid or COD delivered orders for revenue
      if (order.paymentStatus === 'Paid' || (order.paymentMethod === 'COD' && order.status === 'Delivered')) {
        return sum + order.total;
      }
      return sum;
    }, 0);

    const recentOrders = await Order.find({ isActive: true })
      .populate('user', 'fullname email')
      .sort('-createdAt')
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalSales,
        recentOrders
      }
    });
  } catch (error) {
    next(error);
  }
};
