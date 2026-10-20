import { Outlet } from 'react-router'
import { useAuth } from '../model/AuthContext'

export default function SessionGate() {
  const { checking, error, retry } = useAuth()

  if (checking) return <p role="status" className="text-center text-slate-500">Перевіряємо сесію…</p>

  if (error) {
    return (
      <div className="card">
        <p role="alert" className="mb-5 text-red-700">{error}</p>
        <button className="primary" onClick={retry}>Спробувати ще раз</button>
      </div>
    )
  }

  return <Outlet />
}
