const User = require('../models/User');
const bcrypt = require('bcryptjs');

// ----------------------------------------------------
// CUSTOMER (SELF) ROUTES
// ----------------------------------------------------

// @desc    Get user profile
// @route   GET /api/v1/users/me
// @access  Private
exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/v1/users/me
// @access  Private
exports.updateUserProfile = async (req, res, next) => {
  try {
    const { fullname, phoneNumber, countryCode, addresses } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (fullname) user.fullname = fullname;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (countryCode) user.countryCode = countryCode;
    
    // Address updates
    if (addresses && Array.isArray(addresses)) {
      user.addresses = addresses;
    }

    await user.save();

    res.status(200).json({ success: true, message: 'Profile updated successfully', data: user });
  } catch (error) {
    next(error);
  }
};

// @desc    Update password
// @route   PUT /api/v1/users/me/password
// @access  Private
exports.updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Please provide current and new password' });
    }

    const user = await User.findById(req.user.id).select('+password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Incorrect current password' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload Avatar (via Cloudinary, expected to be handled by multer middleware)
// @route   POST /api/v1/users/me/avatar
// @access  Private
exports.uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload an image' });
    }
    
    // Cloudinary returns the URL in req.file.path if using multer-storage-cloudinary
    const avatarUrl = req.file.path;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: avatarUrl },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, message: 'Avatar updated', data: user });
  } catch (error) {
    next(error);
  }
};


// ----------------------------------------------------
// ADMIN ROUTES
// ----------------------------------------------------

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private (Admin with MANAGE_USERS)
exports.getAllUsers = async (req, res, next) => {
  try {
    // Pagination and Search
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    let query = {};
    if (req.query.search) {
      query = {
        $or: [
          { fullname: { $regex: req.query.search, $options: 'i' } },
          { email: { $regex: req.query.search, $options: 'i' } }
        ]
      };
    }

    if (req.query.role) {
      query.role = req.query.role;
    }

    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .populate('adminRole', 'roleName')
      .skip(startIndex)
      .limit(limit)
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: users.length,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      },
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single user by ID
// @route   GET /api/v1/users/:id
// @access  Private (Admin with MANAGE_USERS)
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate('adminRole', 'roleName permissions');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user (e.g. role, active status)
// @route   PUT /api/v1/users/:id
// @access  Private (Admin with MANAGE_USERS)
exports.updateUser = async (req, res, next) => {
  try {
    const { role, adminRole, isActive } = req.body;
    
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Super Admin protection
    if (user.role === 'super_admin' && req.user.role !== 'super_admin') {
      return res.status(403).json({ success: false, message: 'Cannot modify Super Admin' });
    }

    if (role) user.role = role;
    if (adminRole !== undefined) user.adminRole = adminRole;
    if (isActive !== undefined) user.isActive = isActive;

    await user.save();

    res.status(200).json({ success: true, message: 'User updated successfully', data: user });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Private (Admin with MANAGE_USERS)
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.role === 'super_admin') {
      return res.status(403).json({ success: false, message: 'Cannot delete Super Admin' });
    }

    user.isActive = false;
    await user.save();

    res.status(200).json({ success: true, message: 'User soft-deleted successfully', data: {} });
  } catch (error) {
    next(error);
  }
};
