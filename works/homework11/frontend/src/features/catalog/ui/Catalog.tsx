import { useCatalog } from '../hooks/useCatalog'
import CatalogHeader from './CatalogHeader'
import CatalogIntro from './CatalogIntro'
import CatalogNotices from './CatalogNotices'
import CategorySidebar from './CategorySidebar'
import ProductsSection from './ProductsSection'
import CatalogModals from './CatalogModals'

export default function Catalog() {
  const catalog = useCatalog()

  return (
    <>
      <CatalogHeader onAuth={catalog.openModal} />
      <main className="page">
        <CatalogIntro categoryCount={catalog.categories.length} productCount={catalog.products.length} />
        <CatalogNotices
          notice={catalog.notice}
          onDismiss={catalog.dismissNotice}
          onLogin={() => catalog.openModal('login')}
        />
        <div className="catalog-layout">
          <CategorySidebar
            categories={catalog.categories}
            counts={catalog.categoryCounts}
            productCount={catalog.products.length}
            selectedCategory={catalog.selectedCategory}
            creationDisabled={catalog.creationDisabled}
            onSelect={catalog.selectCategory}
            onCreate={() => catalog.openCreate('category')}
          />
          <ProductsSection
            products={catalog.visibleProducts}
            categoryNames={catalog.categoryNames}
            selectedName={catalog.selectedName}
            loading={catalog.loading}
            error={catalog.error}
            creationDisabled={catalog.creationDisabled}
            onCreate={() => catalog.openCreate('product')}
            onRetry={catalog.reload}
          />
        </div>
      </main>
      <footer className="site-footer">
        <span>Каталог.11</span><span>Простий порядок у ваших продуктах</span>
      </footer>
      <CatalogModals catalog={catalog} />
    </>
  )
}
