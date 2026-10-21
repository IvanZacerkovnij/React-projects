import type { AuthFormValues, AuthMode } from '../model/types'

export function readAuthForm(data: FormData): AuthFormValues {
  return {
    email: String(data.get('email') ?? '').trim(),
    password: String(data.get('password') ?? ''),
    repeatPassword: String(data.get('repeat_password') ?? ''),
  }
}

export function validateAuthForm(mode: AuthMode, values: AuthFormValues): string {
  if (mode === 'register' && values.password !== values.repeatPassword)
    return 'Паролі не збігаються.'

  return ''
}
