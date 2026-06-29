const getBaseTemplate = (title, content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    .container { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f4f7f6; }
    .header { background: #6B1E2E; padding: 30px 20px; text-align: center; color: white; border-radius: 8px 8px 0 0; border-bottom: 4px solid #C9A84C; }
    .header h1 { margin: 0; font-size: 28px; letter-spacing: 1px; color: #ffffff; }
    .content { background-color: white; padding: 40px 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    .content h2 { color: #6B1E2E; margin-top: 0; }
    .content p { color: #555; line-height: 1.6; font-size: 16px; }
    .otp-box { background-color: #fdfaf3; border: 2px dashed #C9A84C; text-align: center; padding: 20px; margin: 30px 0; border-radius: 8px; }
    .otp-code { font-size: 36px; font-weight: bold; color: #6B1E2E; letter-spacing: 4px; }
    .order-box { background-color: #f9f9f9; border-left: 4px solid #6B1E2E; padding: 15px 20px; margin: 20px 0; border-radius: 4px; }
    .btn-container { text-align: center; margin-top: 30px; }
    .btn { display: inline-block; background: #6B1E2E; color: #ffffff !important; text-decoration: none; padding: 14px 35px; border-radius: 5px; font-weight: bold; font-size: 16px; letter-spacing: 0.5px; box-shadow: 0 4px 15px rgba(107, 30, 46, 0.3); border: 1px solid #C9A84C; }
    .footer { text-align: center; margin-top: 20px; padding-bottom: 20px; color: #888; font-size: 12px; }
    .warning { color: #d9534f; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Rajvati Fashion</h1>
    </div>
    <div class="content">
      <h2>${title}</h2>
      ${content}
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Rajvati Fashion. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

exports.getWelcomeEmail = (name) => {
  const content = `
    <p>Hello ${name},</p>
    <p>Welcome to the Rajvati Fashion family! We are thrilled to have you on board.</p>
    <p>Get ready to explore our latest trends, premium ethnic wear, and exclusive luxury collections curated just for you.</p>
    <div class="btn-container">
      <a href="${process.env.FRONTEND_URL}" class="btn">Start Shopping →</a>
    </div>
  `;
  return getBaseTemplate("Welcome to Rajvati Fashion!", content);
};

exports.getOrderConfirmationEmail = (orderId, total) => {
  const content = `
    <p>Thank you for shopping with us! Your order has been successfully placed.</p>
    
    <div class="order-box">
      <p style="margin:0;">Order ID: <strong style="color:#6B1E2E;">${orderId}</strong></p>
      <p style="margin:10px 0 0 0;">Total Amount: <strong style="color:#6B1E2E;">₹${total}</strong></p>
    </div>
    
    <p>We will notify you again once your order has been shipped. You can track your order status directly from your account dashboard.</p>
    <div class="btn-container">
      <a href="${process.env.FRONTEND_URL}/account/orders" class="btn">Track Order</a>
    </div>
  `;
  return getBaseTemplate("Order Confirmed!", content);
};

exports.getOtpEmail = (otp) => {
  const content = `
    <p>We received a request to verify your account. Please use the One-Time Password (OTP) below to complete your verification.</p>
    
    <div class="otp-box">
      <div class="otp-code">${otp}</div>
    </div>
    
    <p><strong>Note:</strong> This OTP is valid for the next 10 minutes. Please do not share this code with anyone for your account's security.</p>
  `;
  return getBaseTemplate("Verification Required", content);
};

exports.getReactivationEmail = (name, otp) => {
  const content = `
    <p>Hello ${name},</p>
    <p>You recently tried to log into your account, but it was previously deactivated. Don't worry, you can easily reactivate it using the OTP below.</p>
    
    <div class="otp-box">
      <div class="otp-code">${otp}</div>
    </div>
    
    <p><strong>Note:</strong> This code is valid for 10 minutes. If you did not request this, please ignore this email.</p>
  `;
  return getBaseTemplate("Account Reactivation", content);
};

exports.getLoginNotificationEmail = (name) => {
  const content = `
    <p>Hello ${name},</p>
    <p>We noticed a new login to your Rajvati Fashion account at <strong>${new Date().toLocaleString()}</strong>.</p>
    <p>If this was you, you can safely ignore this email.</p>
    <p class="warning">If you did not authorize this login, please reset your password immediately to secure your account!</p>
    <div class="btn-container">
      <a href="${process.env.FRONTEND_URL}/forgot-password" class="btn" style="background: #d9534f; border-color: #d9534f;">Reset Password</a>
    </div>
  `;
  return getBaseTemplate("Secure Login Alert", content);
};

exports.getPasswordResetEmail = (otp) => {
  const content = `
    <p>We received a request to reset the password for your Rajvati Fashion account. Use the OTP below to set up a new password.</p>
    
    <div class="otp-box">
      <div class="otp-code">${otp}</div>
    </div>
    
    <p><strong>Note:</strong> This code is valid for 10 minutes. If you did not request a password reset, please ignore this email and your password will remain unchanged.</p>
  `;
  return getBaseTemplate("Password Reset Request", content);
};

exports.getAdminInviteEmail = (name, email, password, roleName) => {
  const content = `
    <p>Hello ${name},</p>
    <p>You have been invited to join the <strong>Rajvati Fashion</strong> administrative workspace with the assigned role of <strong style="color: #6B1E2E;">${roleName}</strong>.</p>
    
    <div class="order-box">
      <p style="margin:0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #888;">Your Credentials</p>
      <p style="margin:10px 0 0 0;">Email: <strong>${email}</strong></p>
      <p style="margin:10px 0 0 0;">Temporary Password: <strong style="color: #d9534f; font-size: 18px; letter-spacing: 2px;">${password}</strong></p>
    </div>
    
    <p class="warning" style="margin-top: 15px;">⚠️ Important: Please change your password immediately after your first login for security purposes.</p>
    
    <div class="btn-container">
      <a href="${process.env.ADMIN_URL || 'http://localhost:3000/admin/login'}" class="btn">Login to Workspace →</a>
    </div>
  `;
  return getBaseTemplate("You're Invited!", content);
};
