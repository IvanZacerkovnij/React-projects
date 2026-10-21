import { Navigate } from 'react-router'
import { useAuth } from '../../auth'

export default function MePage() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/?auth=login" replace />

  return (
    <section className="card">
      <span className="mb-5 inline-block rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">Ви авторизовані</span>
      <h1>Мій профіль</h1>
      <p className="mb-8 mt-2 text-slate-500">Раді бачити вас у вашому акаунті.</p>
      <dl className="space-y-5 rounded-xl bg-slate-50 p-5">
        <div><dt className="text-sm text-slate-500">Email</dt><dd className="mt-1 break-all font-medium">{user.email}</dd></div>
        <div><dt className="text-sm text-slate-500">ID користувача</dt><dd className="mt-1 break-all font-mono text-sm">{user.id}</dd></div>
      </dl>
    </section>
  )
}
