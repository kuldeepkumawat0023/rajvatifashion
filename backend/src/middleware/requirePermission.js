const User = require('../models/User');
const AdminRole = require('../models/AdminRole');

/**
 * Middleware to check if the user has a specific permission
 * @param {String} requiredPermission 
 */
const requirePermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Not authenticated' });
      }

      // Super Admin bypasses all checks
      if (req.user.role === 'super_admin') {
        return next();
      }

      // Check if user has an admin role
      if (req.user.role === 'admin' && req.user.adminRole) {
        const role = await AdminRole.findById(req.user.adminRole);
        
        if (!role || !role.isActive) {
          return res.status(403).json({ success: false, message: 'Role is inactive or missing' });
        }

        if (role.permissions.includes(requiredPermission)) {
          return next();
        }
      }

      // Permission denied
      return res.status(403).json({ 
        success: false, 
        message: `Access denied. Requires permission: ${requiredPermission}` 
      });

    } catch (error) {
      console.error('Permission Middleware Error:', error);
      res.status(500).json({ success: false, message: 'Server Error verifying permissions' });
    }
  };
};

module.exports = requirePermission;
