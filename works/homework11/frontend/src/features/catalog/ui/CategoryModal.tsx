import Modal from '../../../shared/ui/Modal'
import Field from '../../../shared/ui/Field'
import FormActions from '../../../shared/ui/FormActions'
import { useCategoryForm } from '../hooks/useCategoryForm'
import type { Category } from '../model/types'

type CategoryModalProps = {
  token: string
  onClose: () => void
  onCreated: (category: Category) => void
}

export default function CategoryModal({ token, onClose, onCreated }: CategoryModalProps) {
  const { register, errors, isSubmitting, onSubmit, nameRules } = useCategoryForm(token, onCreated)

  return (
    <Modal titleId="category-title" onClose={onClose} busy={isSubmitting}>
      <div className="modal-heading">
        <span className="eyebrow">ОРГАНІЗАЦІЯ КАТАЛОГУ</span>
        <h2 id="category-title">Нова категорія</h2>
        <p>Об’єднайте схожі продукти в одну групу.</p>
      </div>
      <form noValidate onSubmit={onSubmit}>
        <fieldset disabled={isSubmitting}>
          <Field id="category-name" label="Назва категорії" error={errors.name?.message}>
            <input
              id="category-name"
              placeholder="Наприклад, Ноутбуки"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'category-name-error' : undefined}
              {...register('name', nameRules)}
            />
          </Field>
        </fieldset>
        {errors.root && <p role="alert" className="alert error">{errors.root.message}</p>}
        <FormActions busy={isSubmitting} submitLabel="Створити категорію" onCancel={onClose} />
      </form>
    </Modal>
  )
}
