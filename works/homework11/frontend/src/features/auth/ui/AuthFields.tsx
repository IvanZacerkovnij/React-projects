import Field from '../../../shared/ui/Field'
import type { useAuthForm } from '../hooks/useAuthForm'

type AuthFieldsProps = { form: ReturnType<typeof useAuthForm> }

export default function AuthFields({ form }: AuthFieldsProps) {
  const { register, errors, isRegister, isSubmitting, rules } = form

  return (
    <fieldset disabled={isSubmitting}>
      <Field id="email" label="Електронна пошта" error={errors.email?.message}>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          {...register('email', rules.email)}
        />
      </Field>
      <Field id="password" label="Пароль" error={errors.password?.message}>
        <input
          id="password"
          type="password"
          autoComplete={isRegister ? 'new-password' : 'current-password'}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'password-error' : undefined}
          {...register('password', rules.password)}
        />
      </Field>
      {isRegister && (
        <Field id="repeatPassword" label="Повторіть пароль" error={errors.repeatPassword?.message}>
          <input
            id="repeatPassword"
            type="password"
            autoComplete="new-password"
            aria-invalid={!!errors.repeatPassword}
            aria-describedby={errors.repeatPassword ? 'repeatPassword-error' : undefined}
            {...register('repeatPassword', rules.repeatPassword)}
          />
        </Field>
      )}
    </fieldset>
  )
}
