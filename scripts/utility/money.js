export function  formatCurrency(priceCents) {
  return ((Math.round(priceCents) * 0.1) / 10).toFixed(2);
}