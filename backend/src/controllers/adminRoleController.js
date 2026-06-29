const AdminRole = require('../models/AdminRole');
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

    res.status(200).json({
      success: true,
      data: role
    });
  } catch (error) {
    console.error('Error updating admin role:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
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

    await role.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting admin role:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
