import { useState } from 'react'
import { getErrorMessage } from '../../../shared/utils/errors'
import { useAuth } from './useAuth'

export function useLogout() {
  const { signOut } = useAuth()
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function handleLogout() {
    setPending(true)
    setError('')
    try {
      await signOut()
    } catch (caught) {
      setError(getErrorMessage(caught, 'Не вдалося вийти.'))
    } finally {
      setPending(false)
    }
  }

  return { handleLogout, error, pending }
}
