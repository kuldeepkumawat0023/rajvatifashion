/**
 * E-commerce RBAC Permissions
 */
const ADMIN_PERMISSIONS = {
  // Products
  MANAGE_PRODUCTS: 'manage_products',
  VIEW_PRODUCTS: 'view_products',
  
  // Orders
  MANAGE_ORDERS: 'manage_orders',
  VIEW_ORDERS: 'view_orders',
  
  // Users
  MANAGE_USERS: 'manage_users',
  VIEW_USERS: 'view_users',
  
  // Categories & Coupons
  MANAGE_CATEGORIES: 'manage_categories',
  MANAGE_COUPONS: 'manage_coupons',
  
  // Analytics
  VIEW_ANALYTICS: 'view_analytics',
  
  // Settings & Roles
  MANAGE_SETTINGS: 'manage_settings',
  MANAGE_ROLES: 'manage_roles',
};

const PERMISSION_LIST = Object.values(ADMIN_PERMISSIONS);

const ADMIN_DEFAULT_ROLES = {
  SUPER_ADMIN: {
    roleName: 'Super Admin',
    description: 'System master with all permissions',
    permissions: PERMISSION_LIST,
    isDefault: true
  }
};

module.exports = {
  ADMIN_PERMISSIONS,
  PERMISSION_LIST,
  ADMIN_DEFAULT_ROLES
};
