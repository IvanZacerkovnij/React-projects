import { formatCurrency } from '../../../shared/utils/formatCurrency'
import type { Product } from '../model/types'
import { useAppDispatch } from '../../../app/hooks'
import { addToCart } from '../../cart/model/cartSlice'

type ProductCardProps = { product: Product; categoryName: string }

export default function ProductCard({ product, categoryName }: ProductCardProps) {
  const dispatch = useAppDispatch()

  return (
    <article className="product-card">
      <div className="product-card-top">
        <span className="category-tag">{categoryName}</span>
        <span className="product-symbol" aria-hidden="true">↗</span>
      </div>
      <h3>{product.name}</h3>
      <p className="product-description">{product.description || 'Опис поки не додано.'}</p>
      <div className="product-price">{formatCurrency(product.price)}</div>
      <button className="button primary cart-add" onClick={() => dispatch(addToCart(product))}>Додати до кошика</button>
    </article>
  )
}
