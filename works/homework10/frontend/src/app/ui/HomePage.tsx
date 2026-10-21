import { Link } from 'react-router'
import { useAuth } from '../../features/auth'

export default function HomePage() {
  const { user } = useAuth()

  return (
    <section className="card">
      <p className="mb-3 text-sm font-semibold text-indigo-600">HOMEWORK 10</p>
      <h1>Ваш особистий кабінет</h1>
      <p className="mb-7 mt-3 leading-relaxed text-slate-500">{user ? 'Ви увійшли в акаунт. Перегляньте свій профіль або вийдіть через меню.' : 'Увійдіть або створіть акаунт, щоб переглянути свій профіль.'}</p>
      <div className="flex flex-wrap items-center gap-4">
        {user ? <Link className="primary" to="/me">Мій профіль</Link> : <><Link className="primary" to="/?auth=login">Увійти</Link><Link className="font-medium text-indigo-600 hover:underline" to="/?auth=register">Створити акаунт</Link></>}
      </div>
    </section>
  )
}
