import type { Category } from '../model/types'

type CategorySidebarProps = {
  categories: Category[]
  counts: Record<string, number>
  productCount: number
  selectedCategory: string
  creationDisabled: boolean
  onSelect: (id: string) => void
  onCreate: () => void
}

export default function CategorySidebar({ categories, counts, productCount, selectedCategory, creationDisabled, onSelect, onCreate }: CategorySidebarProps) {
  return (
    <aside className="category-panel" aria-labelledby="categories-heading">
      <div className="panel-heading">
        <h2 id="categories-heading">Категорії</h2>
        <span className="count">{categories.length}</span>
      </div>
      <nav className="category-list" aria-label="Фільтр продуктів">
        <button
          className={selectedCategory === '' ? 'category-item active' : 'category-item'}
          aria-pressed={selectedCategory === ''}
          onClick={() => onSelect('')}
        >
          <span>Усі продукти</span><span>{productCount}</span>
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            className={selectedCategory === category.id ? 'category-item active' : 'category-item'}
            aria-pressed={selectedCategory === category.id}
            onClick={() => onSelect(category.id)}
          >
            <span>{category.name}</span><span>{counts[category.id] ?? 0}</span>
          </button>
        ))}
      </nav>
      {!creationDisabled && categories.length === 0 && (
        <p className="sidebar-hint">Додайте першу категорію, щоб почати.</p>
      )}
      <button className="button full category-add" disabled={creationDisabled} onClick={onCreate}>＋ Нова категорія</button>
    </aside>
  )
}
