import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import Modal from '../../../shared/ui/Modal'
import { useAuth } from '../model/AuthContext'
import AuthForm from './AuthForm'

export default function AuthModal() {
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()
  const { user, checking, error } = useAuth()
  const [busy, setBusy] = useState(false)
  const mode = params.get('auth')

  if (user || checking || error || (mode !== 'login' && mode !== 'register')) return null

  function close() {
    if (busy) return
    setParams(previous => { previous.delete('auth'); return previous }, { replace: true })
  }

  return (
    <Modal titleId="auth-modal-title" onClose={close} busy={busy}>
      <AuthForm
        key={mode}
        mode={mode}
        onSuccess={() => navigate('/me', { replace: true })}
        onModeChange={() => setParams({ auth: mode === 'login' ? 'register' : 'login' }, { replace: true })}
        onBusyChange={setBusy}
      />
    </Modal>
  )
}
