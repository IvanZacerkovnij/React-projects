import { useAuthForm } from '../model/useAuthForm'
import type { AuthFormOptions } from '../model/useAuthForm'
import AuthFields from './AuthFields'

type AuthFormProps = AuthFormOptions & {
  onModeChange: () => void
}

export default function AuthForm({ mode, onSuccess, onModeChange, onBusyChange }: AuthFormProps) {
  const { error, pending, handleSubmit } = useAuthForm({ mode, onSuccess, onBusyChange })
  const register = mode === 'register'

  return (
    <section className="p-6 sm:p-9">
      <p className="mb-3 text-sm font-semibold text-indigo-600">HOMEWORK 10</p>
      <h1 id="auth-modal-title">{register ? 'Створити акаунт' : 'З поверненням'}</h1>
      <p className="mb-7 mt-2 text-slate-500">{register ? 'Зареєструйтеся, щоб відкрити свій профіль.' : 'Увійдіть, щоб переглянути свій профіль.'}</p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <fieldset disabled={pending} className="space-y-5 disabled:opacity-60">
          <AuthFields mode={mode} />
          {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <button className="primary w-full" type="submit">{pending ? 'Зачекайте…' : register ? 'Зареєструватися' : 'Увійти'}</button>
        </fieldset>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">{register ? 'Вже є акаунт? ' : 'Ще немає акаунта? '}<button type="button" disabled={pending} className="text-indigo-600 hover:underline disabled:opacity-50" onClick={onModeChange}>{register ? 'Увійти' : 'Зареєструватися'}</button></p>
    </section>
  )
}
