import { useForm } from 'react-hook-form'
import { getErrorMessage } from '../../../shared/utils/errors'
import { createProduct } from '../api/catalogApi'
import type { Product, ProductValues } from '../model/types'
import { productRules } from '../utils/formRules'

export function useProductForm(token: string, selectedCategory: string, onCreated: (product: Product) => void) {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<ProductValues>({
    defaultValues: { name: '', description: '', categoryId: selectedCategory, price: undefined },
  })

  const onSubmit = handleSubmit(async values => {
    try {
      onCreated(await createProduct(values, token))
    } catch (caught) {
      setError('root', { message: getErrorMessage(caught, 'Не вдалося створити продукт.') })
    }
  })

  return { register, errors, isSubmitting, onSubmit, rules: productRules }
}
