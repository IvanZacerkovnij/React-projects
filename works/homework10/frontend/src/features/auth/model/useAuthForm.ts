import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { useAuth } from './AuthContext'
import type { AuthMode } from './types'
import { readAuthForm, validateAuthForm } from '../utils/authForm'

export type AuthFormOptions = {
  mode: AuthMode
  onSuccess: () => void
  onBusyChange: (busy: boolean) => void
}

export function useAuthForm({ mode, onSuccess, onBusyChange }: AuthFormOptions) {
  const { signIn } = useAuth()
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const values = readAuthForm(new FormData(event.currentTarget))
    const validationError = validateAuthForm(mode, values)
    setError(validationError)
    if (validationError) return

    setPending(true)
    onBusyChange(true)
    try {
      await signIn(mode, values.email, values.password, values.repeatPassword)
      onSuccess()
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Спробуйте ще раз.')
    } finally {
      setPending(false)
      onBusyChange(false)
    }
  }

  return { error, pending, handleSubmit }
}
