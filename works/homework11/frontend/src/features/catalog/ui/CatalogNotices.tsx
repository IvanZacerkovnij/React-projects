import { useAuth } from '../../auth/hooks/useAuth'

type CatalogNoticesProps = {
  notice: string
  onDismiss: () => void
  onLogin: () => void
}

export default function CatalogNotices({ notice, onDismiss, onLogin }: CatalogNoticesProps) {
  const { user, checking, error, retry } = useAuth()

  return (
    <>
      {error && (
        <div role="alert" className="alert error">
          {error} <button className="text-button" onClick={retry}>Перевірити сесію ще раз</button>
        </div>
      )}
      {notice && (
        <div role="status" className="alert success">
          <span>{notice}</span>
          <button className="text-button" aria-label="Приховати повідомлення" onClick={onDismiss}>×</button>
        </div>
      )}
      {!user && !checking && (
        <div className="guest-note">
          <span>Переглядайте каталог вільно. Для створення записів увійдіть до акаунта.</span>
          <button className="text-button" onClick={onLogin}>Увійти →</button>
        </div>
      )}
    </>
  )
}
