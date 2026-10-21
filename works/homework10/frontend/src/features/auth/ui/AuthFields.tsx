import type { AuthMode } from '../model/types'

export default function AuthFields({ mode }: { mode: AuthMode }) {
  const register = mode === 'register'

  return (
    <>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} autoFocus required />
      </label>
      <label>
        Пароль
        <input
          name="password"
          type="password"
          autoComplete={register ? 'new-password' : 'current-password'}
          minLength={register ? 8 : undefined}
          maxLength={128}
          placeholder={register ? 'Щонайменше 8 символів' : 'Ваш пароль'}
          required
        />
      </label>
      {register && (
        <label>
          Повторіть пароль
          <input name="repeat_password" type="password" autoComplete="new-password" maxLength={128} required />
        </label>
      )}
    </>
  )
}
