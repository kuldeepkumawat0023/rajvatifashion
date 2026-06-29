function calcOrderPrices(items, coupon = null) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.qty), 0);

  // Auto discounts based on order value
  let discount = 0;
  if (subtotal >= 2199) {
    discount = subtotal * 0.10;  // 10% off
  } else if (subtotal >= 1899) {
    discount = subtotal * 0.05;  // 5% off
  }

  // Coupon discount (additional)
  if (coupon) {
    if (coupon.type === 'percent') {
      discount += (subtotal - discount) * (coupon.value / 100);
    } else {
      discount += coupon.value;
    }
  }

  // Shipping
  const afterDiscount = subtotal - discount;
  const shipping = afterDiscount >= 1299 ? 0 : 99;

  return {
    subtotal: Math.round(subtotal),
    discount: Math.round(discount),
    shipping,
    total: Math.round(afterDiscount + shipping),
  };
}

module.exports = calcOrderPrices;
