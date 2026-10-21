import Field from '../../../shared/ui/Field'
import type { useProductForm } from '../hooks/useProductForm'
import type { Category } from '../model/types'

type ProductFieldsProps = { form: ReturnType<typeof useProductForm>; categories: Category[] }

export default function ProductFields({ form, categories }: ProductFieldsProps) {
  const { register, errors, isSubmitting, rules } = form

  return (
    <fieldset disabled={isSubmitting}>
      <Field id="product-name" label="Назва продукту" error={errors.name?.message}>
        <input
          id="product-name"
          placeholder="Наприклад, Lenovo IdeaPad"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'product-name-error' : undefined}
          {...register('name', rules.name)}
        />
      </Field>
      <div className="form-row">
        <Field id="product-price" label="Ціна, грн" error={errors.price?.message}>
          <input
            id="product-price"
            type="number"
            min="0.01"
            max="9999999999.99"
            step="0.01"
            placeholder="0.00"
            aria-invalid={!!errors.price}
            aria-describedby={errors.price ? 'product-price-error' : undefined}
            {...register('price', rules.price)}
          />
        </Field>
        <Field id="product-category" label="Категорія" error={errors.categoryId?.message}>
          <select
            id="product-category"
            aria-invalid={!!errors.categoryId}
            aria-describedby={errors.categoryId ? 'product-category-error' : undefined}
            {...register('categoryId', rules.categoryId)}
          >
            <option value="">Оберіть категорію</option>
            {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
          </select>
        </Field>
      </div>
      <Field id="product-description" label="Опис (необов’язково)" error={errors.description?.message}>
        <textarea
          id="product-description"
          rows={3}
          placeholder="Кілька слів про продукт…"
          aria-invalid={!!errors.description}
          aria-describedby={errors.description ? 'product-description-error' : undefined}
          {...register('description', rules.description)}
        />
      </Field>
    </fieldset>
  )
}
