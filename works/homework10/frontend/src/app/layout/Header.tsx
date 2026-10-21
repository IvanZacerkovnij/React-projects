import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { useAuth } from '../../features/auth'

export default function Header() {
  const { user, checking, error, signOut } = useAuth()
  const [logoutError, setLogoutError] = useState('')
  const [pending, setPending] = useState(false)

  async function handleLogout() {
    setPending(true)
    setLogoutError('')
    try { await signOut() }
    catch (caught) { setLogoutError(caught instanceof Error ? caught.message : 'Не вдалося вийти.') }
    finally { setPending(false) }
  }

  return (
    <>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-5 py-5">
          <Link to="/" className="text-lg font-bold tracking-tight">Auth<span className="text-indigo-600">.10</span></Link>
          {!checking && !error && <nav className="flex flex-wrap items-center gap-5 text-sm">
            {user ? <><span className="break-all text-slate-600">Welcome, {user.email}</span><NavLink to="/me">Me</NavLink><button disabled={pending} onClick={handleLogout} className="font-medium text-indigo-600 disabled:opacity-50">{pending ? 'Виходимо…' : 'Logout'}</button></> : <><Link to="/?auth=login">Вхід</Link><Link to="/?auth=register">Реєстрація</Link></>}
          </nav>}
        </div>
      </header>
      {logoutError && <p role="alert" className="mx-auto mt-5 max-w-lg rounded-lg bg-red-50 p-4 text-red-700">{logoutError}</p>}
    </>
  )
}
