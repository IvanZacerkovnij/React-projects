import { useForm } from 'react-hook-form'
import { getErrorMessage } from '../../../shared/utils/errors'
import type { AuthFormValues, AuthMode } from '../model/types'
import { getAuthRules } from '../utils/formRules'
import { useAuth } from './useAuth'

export function useAuthForm(mode: AuthMode, onSuccess: () => void) {
  const { signIn } = useAuth()
  const { register, handleSubmit, getValues, setError, formState: { errors, isSubmitting } } = useForm<AuthFormValues>()
  const isRegister = mode === 'register'
  const rules = getAuthRules(isRegister, () => getValues('password'))

  const onSubmit = handleSubmit(async values => {
    try {
      await signIn(mode, values.email.trim(), values.password, values.repeatPassword)
      onSuccess()
    } catch (caught) {
      setError('root', { message: getErrorMessage(caught, 'Не вдалося увійти.') })
    }
  })

  return { register, errors, isSubmitting, isRegister, rules, onSubmit }
}
