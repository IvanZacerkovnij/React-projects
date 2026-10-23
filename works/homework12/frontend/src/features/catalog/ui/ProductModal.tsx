import Modal from '../../../shared/ui/Modal'
import FormActions from '../../../shared/ui/FormActions'
import { useProductForm } from '../hooks/useProductForm'
import type { Category, Product } from '../model/types'
import ProductFields from './ProductFields'

type ProductModalProps = {
  token: string
  categories: Category[]
  selectedCategory: string
  onClose: () => void
  onCreated: (product: Product) => void
  onCreateCategory: () => void
}

export default function ProductModal({ token, categories, selectedCategory, onClose, onCreated, onCreateCategory }: ProductModalProps) {
  const form = useProductForm(token, selectedCategory, onCreated)

  return (
    <Modal titleId="product-title" onClose={onClose} busy={form.isSubmitting}>
      <div className="modal-heading">
        <span className="eyebrow">ПОПОВНЕННЯ КОЛЕКЦІЇ</span>
        <h2 id="product-title">Новий продукт</h2>
        <p>Додайте назву, ціну та оберіть категорію.</p>
      </div>
      {categories.length === 0 ? (
        <div className="empty-modal">
          <p>Спочатку створіть категорію для продукту.</p>
          <button className="button primary" onClick={onCreateCategory}>Створити категорію</button>
        </div>
      ) : (
        <form noValidate onSubmit={form.onSubmit}>
          <ProductFields form={form} categories={categories} />
          {form.errors.root && <p role="alert" className="alert error">{form.errors.root.message}</p>}
          <FormActions busy={form.isSubmitting} submitLabel="Створити продукт" onCancel={onClose} />
        </form>
      )}
    </Modal>
  )
}
