import AuthModal from '../../auth/ui/AuthModal'
import type { useCatalog } from '../hooks/useCatalog'
import CategoryModal from './CategoryModal'
import ProductModal from './ProductModal'

type CatalogModalsProps = { catalog: ReturnType<typeof useCatalog> }

export default function CatalogModals({ catalog }: CatalogModalsProps) {
  const { modal, token, closeModal, openModal, categoryCreated, productCreated, categories, selectedCategory } = catalog

  if (modal === 'login' || modal === 'register') {
    return <AuthModal key={modal} mode={modal} onClose={closeModal} onModeChange={openModal} />
  }
  if (!token) return null
  if (modal === 'category') {
    return <CategoryModal token={token} onClose={closeModal} onCreated={categoryCreated} />
  }
  if (modal === 'product') {
    return (
      <ProductModal
        token={token}
        categories={categories}
        selectedCategory={selectedCategory}
        onClose={closeModal}
        onCreated={productCreated}
        onCreateCategory={() => openModal('category')}
      />
    )
  }
  return null
}
