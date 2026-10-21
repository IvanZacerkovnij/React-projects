import type { Product } from '../model/types'
import ProductCard from './ProductCard'

type ProductsSectionProps = {
  products: Product[]
  categoryNames: Record<string, string>
  selectedName?: string
  loading: boolean
  error: string
  creationDisabled: boolean
  onCreate: () => void
  onRetry: () => void
}

export default function ProductsSection({ products, categoryNames, selectedName, loading, error, creationDisabled, onCreate, onRetry }: ProductsSectionProps) {
  function renderProducts() {
    if (loading) {
      return <div className="empty-state" role="status"><span className="loading-dot" />Завантажуємо каталог…</div>
    }
    if (error) {
      return (
        <div className="empty-state">
          <h3>Каталог поки недоступний</h3>
          <p role="alert">{error}</p>
          <button className="button" onClick={onRetry}>Спробувати ще раз</button>
        </div>
      )
    }
    if (products.length === 0) {
      return (
        <div className="empty-state">
          <span className="empty-icon" aria-hidden="true">＋</span>
          <h3>{selectedName ? 'У цій категорії ще немає продуктів' : 'Ваш каталог починається тут'}</h3>
          <p>Додайте перший продукт — і він з’явиться в цій колекції.</p>
          <button className="button primary" disabled={creationDisabled} onClick={onCreate}>Додати продукт</button>
        </div>
      )
    }
    return (
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} categoryName={categoryNames[product.categoryId] || 'Категорія'} />
        ))}
      </div>
    )
  }

  return (
    <section className="products-section" aria-labelledby="products-heading" aria-busy={loading}>
      <div className="products-heading">
        <div><h2 id="products-heading">{selectedName || 'Усі продукти'}</h2><p>{products.length} у каталозі</p></div>
        <button className="button primary" disabled={creationDisabled} onClick={onCreate}>＋ Додати продукт</button>
      </div>
      {renderProducts()}
    </section>
  )
}
