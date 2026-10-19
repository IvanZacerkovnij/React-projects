export function calculateDiscountedPrice(price: number, discountPercent: number): number {
  return price * (1 - discountPercent / 100);
}

export function formatPrice(value: number): string {
  return value.toLocaleString('uk-UA', { style: 'currency', currency: 'UAH' });
}
