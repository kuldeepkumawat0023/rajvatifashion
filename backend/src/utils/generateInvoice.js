const { formatCurrency } = require('./formatHelpers');

const generateInvoiceHtml = (order) => {
  let itemsHtml = '';
  order.items.forEach(item => {
    itemsHtml += `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name} (Size: ${item.size || 'N/A'})</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${item.qty}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">${formatCurrency(item.price)}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">${formatCurrency(item.price * item.qty)}</td>
      </tr>
    `;
  });

  return `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 800px; margin: auto; padding: 30px; border: 1px solid #eee; box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);">
      <table style="width: 100%; line-height: inherit; text-align: left; border-collapse: collapse;">
        <tr>
          <td style="padding-bottom: 20px;">
            <h1 style="color: #6B1E2E; margin: 0;">Rajvati Fashion</h1>
            <p style="color: #666; margin: 5px 0 0;">Official Tax Invoice</p>
          </td>
          <td style="padding-bottom: 20px; text-align: right;">
            <h3 style="margin: 0;">Invoice #: INV-${order.orderId}</h3>
            <p style="color: #666; margin: 5px 0 0;">Date: ${new Date(order.createdAt).toLocaleDateString()}</p>
          </td>
        </tr>
        <tr>
          <td colspan="2" style="padding-bottom: 20px;">
            <strong>Billed To:</strong><br>
            ${order.user.fullname || order.guestInfo?.name}<br>
            ${order.shippingAddress.street}, ${order.shippingAddress.city}<br>
            ${order.shippingAddress.state} - ${order.shippingAddress.pincode}
          </td>
        </tr>
      </table>

      <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
        <thead>
          <tr style="background: #f8f8f8;">
            <th style="padding: 10px; border-bottom: 2px solid #ddd; text-align: left;">Item</th>
            <th style="padding: 10px; border-bottom: 2px solid #ddd; text-align: center;">Qty</th>
            <th style="padding: 10px; border-bottom: 2px solid #ddd; text-align: right;">Price</th>
            <th style="padding: 10px; border-bottom: 2px solid #ddd; text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>

      <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
        <tr>
          <td style="width: 60%;"></td>
          <td style="padding: 5px 10px; text-align: right;"><strong>Subtotal:</strong></td>
          <td style="padding: 5px 10px; text-align: right;">${formatCurrency(order.subtotal)}</td>
        </tr>
        <tr>
          <td style="width: 60%;"></td>
          <td style="padding: 5px 10px; text-align: right;"><strong>Discount:</strong></td>
          <td style="padding: 5px 10px; text-align: right; color: green;">-${formatCurrency(order.discount)}</td>
        </tr>
        <tr>
          <td style="width: 60%;"></td>
          <td style="padding: 5px 10px; text-align: right;"><strong>Shipping:</strong></td>
          <td style="padding: 5px 10px; text-align: right;">${order.shipping === 0 ? 'Free' : formatCurrency(order.shipping)}</td>
        </tr>
        <tr>
          <td style="width: 60%;"></td>
          <td style="padding: 10px; text-align: right; border-top: 2px solid #ddd; font-size: 1.2em;"><strong>Total Paid:</strong></td>
          <td style="padding: 10px; text-align: right; border-top: 2px solid #ddd; font-size: 1.2em; color: #6B1E2E;"><strong>${formatCurrency(order.total)}</strong></td>
        </tr>
      </table>

      <div style="margin-top: 40px; text-align: center; color: #888; font-size: 0.9em;">
        <p>Thank you for shopping with Rajvati Fashion!</p>
        <p>If you have any questions concerning this invoice, contact our support.</p>
      </div>
    </div>
  `;
};

module.exports = { generateInvoiceHtml };
