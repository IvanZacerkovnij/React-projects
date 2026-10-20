import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import { useAuth } from '../model/AuthContext'

export default function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  const { user, signIn } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  const register = mode === 'register'

  if (user) return <Navigate to="/me" replace />

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
    try {
      await signIn(mode, email, password, repeatPassword)
      navigate('/me', { replace: true })
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Спробуйте ще раз.')
    } finally {
      setPending(false)
    }
  }

  return (
    <section className="card">
      <p className="mb-3 text-sm font-semibold text-indigo-600">HOMEWORK 09</p>
      <h1>{register ? 'Створити акаунт' : 'З поверненням'}</h1>
      <p className="mb-7 mt-2 text-slate-500">{register ? 'Зареєструйтеся, щоб відкрити свій профіль.' : 'Увійдіть, щоб переглянути свій профіль.'}</p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <fieldset disabled={pending} className="space-y-5 disabled:opacity-60">
          <label>Email<input name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} required /></label>
          <label>Пароль<input name="password" type="password" autoComplete={register ? 'new-password' : 'current-password'} minLength={register ? 8 : undefined} maxLength={128} placeholder={register ? 'Щонайменше 8 символів' : 'Ваш пароль'} required /></label>
          {register && <label>Повторіть пароль<input name="repeat_password" type="password" autoComplete="new-password" maxLength={128} required /></label>}
          {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <button className="primary w-full" type="submit">{pending ? 'Зачекайте…' : register ? 'Зареєструватися' : 'Увійти'}</button>
        </fieldset>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">{register ? 'Вже є акаунт? ' : 'Ще немає акаунта? '}<Link className="text-indigo-600 hover:underline" to={register ? '/login' : '/register'}>{register ? 'Увійти' : 'Зареєструватися'}</Link></p>
    </section>
  )
}
