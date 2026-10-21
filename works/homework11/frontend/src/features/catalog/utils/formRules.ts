import { requiredText } from '../../../shared/utils/validation'

export const categoryNameRules = requiredText('Вкажіть назву категорії.', 100)

export const productRules = {
  name: requiredText('Вкажіть назву продукту.', 200),
  price: {
    valueAsNumber: true,
    required: 'Вкажіть ціну.',
    min: { value: 0.01, message: 'Ціна має бути від 0,01 грн.' },
    max: { value: 9999999999.99, message: 'Перевищено максимальну ціну.' },
    validate: (value: number) => Number.isFinite(value) || 'Вкажіть коректну ціну.',
  },
  categoryId: { required: 'Оберіть категорію.' },
  description: { maxLength: { value: 2000, message: 'Максимум 2000 символів.' } },
}
