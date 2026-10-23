import { useForm } from 'react-hook-form'
import { getErrorMessage } from '../../../shared/utils/errors'
import { createCategory } from '../api/catalogApi'
import type { Category, CategoryValues } from '../model/types'
import { categoryNameRules } from '../utils/formRules'

export function useCategoryForm(token: string, onCreated: (category: Category) => void) {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<CategoryValues>()

  const onSubmit = handleSubmit(async values => {
    try {
      onCreated(await createCategory(values, token))
    } catch (caught) {
      setError('root', { message: getErrorMessage(caught, 'Не вдалося створити категорію.') })
    }
  })

  return { register, errors, isSubmitting, onSubmit, nameRules: categoryNameRules }
}
