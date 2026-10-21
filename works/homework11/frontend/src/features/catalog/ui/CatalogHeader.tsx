import { useAuth } from '../../auth/hooks/useAuth'
import { useLogout } from '../../auth/hooks/useLogout'
import type { AuthMode } from '../../auth/model/types'

type CatalogHeaderProps = { onAuth: (mode: AuthMode) => void }

export default function CatalogHeader({ onAuth }: CatalogHeaderProps) {
  const { user, checking } = useAuth()
  const { handleLogout, pending, error } = useLogout()

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <a href="/" className="brand" aria-label="Каталог, головна">
            <span className="brand-mark" aria-hidden="true">К</span>
            Каталог<span className="brand-number">.11</span>
          </a>
          <nav aria-label="Акаунт" className="account-nav">
            {checking ? <span className="muted">Перевіряємо сесію…</span> : user ? (
              <>
                <span className="user-email">{user.email}</span>
                <button className="button small" onClick={handleLogout} disabled={pending}>
                  {pending ? 'Виходимо…' : 'Вийти'}
                </button>
              </>
            ) : (
              <>
                <button className="text-button" onClick={() => onAuth('login')}>Увійти</button>
                <button className="button small" onClick={() => onAuth('register')}>Реєстрація</button>
              </>
            )}
          </nav>
        </div>
      </header>
      {error && <p role="alert" className="page alert error">{error}</p>}
    </>
  )
}
