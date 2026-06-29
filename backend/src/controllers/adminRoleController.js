const AdminRole = require('../models/AdminRole');
const User = require('../models/User');
const sendEmail = require('../config/email');
const { getAdminInviteEmail } = require('../utils/emailTemplates');
const { ADMIN_DEFAULT_ROLES, ADMIN_PERMISSIONS } = require('../config/permissions');

// @desc    Get all admin roles
// @route   GET /api/v1/admin/roles
// @access  Private (Super Admin)
exports.getAdminRoles = async (req, res) => {
  try {
    // Check if SUPER_ADMIN default role exists
    let superAdminRole = await AdminRole.findOne({ isDefault: true });
    
    // Seed default role if it doesn't exist
    if (!superAdminRole) {
      superAdminRole = await AdminRole.create({
        roleName: 'Super Admin',
        description: ADMIN_DEFAULT_ROLES.SUPER_ADMIN.description,
        permissions: ADMIN_DEFAULT_ROLES.SUPER_ADMIN.permissions,
        isDefault: true
      });
    }

    const roles = await AdminRole.find().sort({ isDefault: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: roles.length,
      data: roles
    });
  } catch (error) {
    console.error('Error fetching admin roles:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Create a custom admin role
// @route   POST /api/v1/admin/roles
// @access  Private (Super Admin)
exports.createAdminRole = async (req, res) => {
  try {
    const { roleName, description, permissions } = req.body;

    if (!roleName) {
      return res.status(400).json({ success: false, message: 'Please provide a role name' });
    }

    if (!permissions || !Array.isArray(permissions) || permissions.length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide at least one permission' });
    }

    // Validate that the roleName doesn't already exist
    const existingRole = await AdminRole.findOne({ roleName: new RegExp(`^${roleName}$`, 'i') });
    if (existingRole) {
      return res.status(400).json({ success: false, message: 'A role with this name already exists' });
    }

    const newRole = await AdminRole.create({
      roleName,
      description,
      permissions,
      isDefault: false,
      createdBy: req.user._id
    });

    res.status(201).json({
      success: true,
      data: newRole
    });
  } catch (error) {
    console.error('Error creating admin role:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Update a custom admin role
// @route   PUT /api/v1/admin/roles/:id
// @access  Private (Super Admin)
exports.updateAdminRole = async (req, res) => {
  try {
    const { roleName, description, permissions } = req.body;
    const roleId = req.params.id;

    const role = await AdminRole.findById(roleId);

    if (!role) {
      return res.status(404).json({ success: false, message: 'Role not found' });
    }

    if (role.isDefault) {
      return res.status(403).json({ success: false, message: 'Cannot modify a default system role' });
    }

    if (roleName) {
      // Check if new name conflicts with an existing role
      const nameConflict = await AdminRole.findOne({ 
        roleName: new RegExp(`^${roleName}$`, 'i'), 
        _id: { $ne: roleId } 
      });
      if (nameConflict) {
        return res.status(400).json({ success: false, message: 'Another role with this name already exists' });
      }
      role.roleName = roleName;
    }

    if (description !== undefined) {
      role.description = description;
    }

    if (permissions && Array.isArray(permissions)) {
      if (permissions.length === 0) {
        return res.status(400).json({ success: false, message: 'Please provide at least one permission' });
      }
      role.permissions = permissions;
    }

    await role.save();

    res.status(200).json({ success: true, data: role });
  } catch (error) {
    next(error);
  }
};

// @desc    Invite a new or existing user to be an admin
// @route   POST /api/v1/admin-roles/invite
// @access  Private (Requires MANAGE_ROLES or super_admin)
exports.inviteAdmin = async (req, res, next) => {
  try {
    const { email, name, roleId } = req.body;

    if (!email || !roleId) {
      return res.status(400).json({ success: false, message: 'Email and role ID are required' });
    }

    const role = await AdminRole.findById(roleId);
    if (!role) {
      return res.status(404).json({ success: false, message: 'Role not found' });
    }

    let user = await User.findOne({ email });
    const generatedPassword = Math.random().toString(36).slice(-8) + 'A1@'; // Secure temp password

    if (!user) {
      // Create new admin user
      user = await User.create({
        fullname: name || email.split('@')[0],
        email: email.toLowerCase().trim(),
        password: generatedPassword,
        role: 'admin',
        adminRole: role._id,
        isOtpVerified: true,
      });
    } else {
      // Upgrade existing user to admin
      user.role = 'admin';
      user.adminRole = role._id;
      user.password = generatedPassword;
      await user.save();
    }

    // Send Invite Email
    try {
      await sendEmail({
        email: user.email,
        subject: "You're Invited! Join Rajvati Fashion Workspace",
        message: getAdminInviteEmail(user.fullname, user.email, generatedPassword, role.roleName),
      });
    } catch (err) {
      console.log('Error sending invite email', err);
    }

    res.status(201).json({ success: true, message: 'Admin invited successfully', data: user });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a custom admin role
// @route   DELETE /api/v1/admin/roles/:id
// @access  Private (Super Admin)
exports.deleteAdminRole = async (req, res) => {
  try {
    const roleId = req.params.id;

    const role = await AdminRole.findById(roleId);

    if (!role) {
      return res.status(404).json({ success: false, message: 'Role not found' });
    }

    if (role.isDefault) {
      return res.status(403).json({ success: false, message: 'Cannot delete a default system role' });
    }

    // Optional: check if any users are using this role before deleting
    const User = require('../models/User');
    const usersWithRole = await User.countDocuments({ adminRole: roleId });
    if (usersWithRole > 0) {
      return res.status(400).json({ 
        success: false, 
        message: `Cannot delete role. There are ${usersWithRole} users assigned to this role.` 
      });
    }

    role.isActive = false;
    await role.save();

    res.status(200).json({
      success: true,
      message: 'Admin role soft-deleted successfully',
      data: {}
    });
  } catch (error) {
    console.error('Error deleting admin role:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
