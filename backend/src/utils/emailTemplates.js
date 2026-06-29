exports.getWelcomeEmail = (name) => `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
  <h2 style="color: #6B1E2E;">Welcome to Rajvati Fashion!</h2>
  <p>Hello ${name},</p>
  <p>Thank you for creating an account with Rajvati Fashion. Get ready to explore the latest trends and exclusive collections!</p>
  <a href="${process.env.FRONTEND_URL}" style="display: inline-block; padding: 10px 20px; background-color: #6B1E2E; color: #fff; text-decoration: none; border-radius: 5px; margin-top: 20px;">Start Shopping</a>
</div>
`;

exports.getOrderConfirmationEmail = (orderId, total) => `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
  <h2 style="color: #2D7A4F;">Order Confirmed!</h2>
  <p>Thank you for your purchase.</p>
  <p>Your order ID is: <strong>${orderId}</strong></p>
  <p>Total Amount: <strong>₹${total}</strong></p>
  <p>We will notify you once your order is shipped.</p>
</div>
`;

exports.getOtpEmail = (otp) => `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
  <h2 style="color: #C9A84C;">Verification OTP</h2>
  <p>Your OTP is: <strong style="font-size: 24px; color: #C9A84C;">${otp}</strong></p>
  <p>This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
</div>
`;

exports.getReactivationEmail = (name, otp) => `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
  <h2 style="color: #6B1E2E;">Account Reactivation</h2>
  <p>Hello ${name},</p>
  <p>Your OTP for account reactivation is: <strong style="font-size: 24px; color: #C9A84C;">${otp}</strong> (Valid for 10 minutes)</p>
</div>
`;

exports.getLoginNotificationEmail = (name) => `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
  <h2 style="color: #2D7A4F;">Secure Login Notification</h2>
  <p>Hello ${name}, you have successfully logged in to your Rajvati Fashion account at ${new Date().toLocaleString()}.</p>
  <p>If this wasn't you, please reset your password immediately.</p>
</div>
`;

exports.getPasswordResetEmail = (otp) => `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
  <h2 style="color: #6B1E2E;">Password Reset</h2>
  <p>Your OTP for password reset is: <strong style="font-size: 24px; color: #C9A84C;">${otp}</strong> (Valid for 10 minutes)</p>
  <p>If you didn't request a password reset, please ignore this email.</p>
</div>
`;
