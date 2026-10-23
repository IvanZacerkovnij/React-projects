import Modal from '../../../shared/ui/Modal'
import { useAuthForm } from '../hooks/useAuthForm'
import type { AuthMode } from '../model/types'
import AuthFields from './AuthFields'

type AuthModalProps = {
  mode: AuthMode
  onClose: () => void
  onModeChange: (mode: AuthMode) => void
}

export default function AuthModal({ mode, onClose, onModeChange }: AuthModalProps) {
  const form = useAuthForm(mode, onClose)
  const { isRegister, isSubmitting, errors, onSubmit } = form

  return (
    <Modal titleId="auth-title" onClose={onClose} busy={isSubmitting}>
      <div className="modal-heading">
        <span className="eyebrow">ВАШ АКАУНТ</span>
        <h2 id="auth-title">{isRegister ? 'Створити акаунт' : 'Вхід до акаунта'}</h2>
        <p>Увійдіть, щоб додавати категорії та продукти.</p>
      </div>
      <form noValidate onSubmit={onSubmit}>
        <AuthFields form={form} />
        {errors.root && <p role="alert" className="alert error">{errors.root.message}</p>}
        <button className="button primary full" disabled={isSubmitting}>
          {isSubmitting ? 'Зачекайте…' : isRegister ? 'Зареєструватися' : 'Увійти'}
        </button>
      </form>
      <p className="modal-switch">
        {isRegister ? 'Уже є акаунт?' : 'Ще немає акаунта?'}{' '}
        <button
          className="text-button"
          disabled={isSubmitting}
          onClick={() => onModeChange(isRegister ? 'login' : 'register')}
        >
          {isRegister ? 'Увійти' : 'Зареєструватися'}
        </button>
      </p>
    </Modal>
  )
}
