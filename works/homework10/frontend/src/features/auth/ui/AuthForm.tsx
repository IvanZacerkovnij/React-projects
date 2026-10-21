import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { useAuth } from '../model/AuthContext'

type AuthFormProps = {
  mode: 'login' | 'register'
  onSuccess: () => void
  onModeChange: () => void
  onBusyChange: (busy: boolean) => void
}

export default function AuthForm({ mode, onSuccess, onModeChange, onBusyChange }: AuthFormProps) {
  const { signIn } = useAuth()
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  const register = mode === 'register'

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = String(data.get('email')).trim()
    const password = String(data.get('password'))
    const repeatPassword = String(data.get('repeat_password') ?? '')
    setError('')
    if (register && password !== repeatPassword) {
      setError('Паролі не збігаються.')
      return
    }
    setPending(true)
    onBusyChange(true)
    try {
      await signIn(mode, email, password, repeatPassword)
      onSuccess()
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Спробуйте ще раз.')
    } finally {
      setPending(false)
      onBusyChange(false)
    }
  }

  return (
    <section className="p-6 sm:p-9">
      <p className="mb-3 text-sm font-semibold text-indigo-600">HOMEWORK 10</p>
      <h1 id="auth-modal-title">{register ? 'Створити акаунт' : 'З поверненням'}</h1>
      <p className="mb-7 mt-2 text-slate-500">{register ? 'Зареєструйтеся, щоб відкрити свій профіль.' : 'Увійдіть, щоб переглянути свій профіль.'}</p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <fieldset disabled={pending} className="space-y-5 disabled:opacity-60">
          <label>Email<input name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} autoFocus required /></label>
          <label>Пароль<input name="password" type="password" autoComplete={register ? 'new-password' : 'current-password'} minLength={register ? 8 : undefined} maxLength={128} placeholder={register ? 'Щонайменше 8 символів' : 'Ваш пароль'} required /></label>
          {register && <label>Повторіть пароль<input name="repeat_password" type="password" autoComplete="new-password" maxLength={128} required /></label>}
          {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <button className="primary w-full" type="submit">{pending ? 'Зачекайте…' : register ? 'Зареєструватися' : 'Увійти'}</button>
        </fieldset>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">{register ? 'Вже є акаунт? ' : 'Ще немає акаунта? '}<button type="button" disabled={pending} className="text-indigo-600 hover:underline disabled:opacity-50" onClick={onModeChange}>{register ? 'Увійти' : 'Зареєструватися'}</button></p>
    </section>
  )
}
