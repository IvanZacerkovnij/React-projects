import type { Product } from '../types/Product';

export function ProductCard({ product }: { product: Product }) {
  const price = product.price * (1 - product.discountPercent / 100);
  const formatPrice = (value: number) => value.toLocaleString('uk-UA', { style: 'currency', currency: 'UAH' });

  return (
    <li className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {product.media[0] && <img src={product.media[0]} alt={product.name} className="mb-4 h-40 w-full object-contain" />}
      <h3 className="font-semibold break-words">{product.name}</h3>
      {product.discountPercent > 0 && <p className="mt-3 text-sm text-slate-500"><s>{formatPrice(product.price)}</s> · −{product.discountPercent}%</p>}
      <p className="mt-2 text-xl font-bold text-emerald-700">{formatPrice(price)}</p>
      <p className="mt-2 text-sm text-slate-500">Рейтинг: {product.rating} / 5 · Відгуків: {product.reviewsCount}</p>
    </li>
  );
}
