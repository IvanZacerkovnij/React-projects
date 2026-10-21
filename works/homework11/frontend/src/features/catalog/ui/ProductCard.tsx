import { formatCurrency } from '../../../shared/utils/formatCurrency'
import type { Product } from '../model/types'

type ProductCardProps = { product: Product; categoryName: string }

export default function ProductCard({ product, categoryName }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-card-top">
        <span className="category-tag">{categoryName}</span>
        <span className="product-symbol" aria-hidden="true">↗</span>
      </div>
      <h3>{product.name}</h3>
      <p className="product-description">{product.description || 'Опис поки не додано.'}</p>
      <div className="product-price">{formatCurrency(product.price)}</div>
    </article>
  )
}
