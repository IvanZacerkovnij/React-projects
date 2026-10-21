import { useEffect, useState } from 'react'
import { ApiError } from '../../../shared/api/http'
import { authenticate, getMe, logout } from '../api/authApi'
import type { User } from '../model/types'
import type { AuthState } from '../model/AuthContext'
import { getErrorMessage } from '../../../shared/utils/errors'
import { getTokenExpirationDelay, tokenStorageKey } from '../utils/token'

export function useAuthSession(): AuthState {
  const [token, setToken] = useState(() => localStorage.getItem(tokenStorageKey))
  const [user, setUser] = useState<User | null>(null)
  const [checking, setChecking] = useState(true)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)

  function clearSession() {
    localStorage.removeItem(tokenStorageKey)
    setToken(null)
    setUser(null)
  }

  useEffect(() => {
    let active = true
    async function restoreSession() {
      try {
        const currentUser = token ? await getMe(token) : null
        if (active) setUser(currentUser)
      } catch (caught) {
        if (!active) return
        if (caught instanceof ApiError && caught.status === 401) clearSession()
        else setError(getErrorMessage(caught, 'Не вдалося перевірити сесію.'))
      } finally {
        if (active) setChecking(false)
      }
    }
    void restoreSession()
    return () => { active = false }
  }, [token, attempt])

  useEffect(() => {
    if (!token) return
    const timer = window.setTimeout(clearSession, getTokenExpirationDelay(token))
    return () => window.clearTimeout(timer)
  }, [token])

  async function signIn(mode: 'login' | 'register', email: string, password: string, repeatPassword?: string) {
    const result = await authenticate(mode, email, password, repeatPassword)
    const currentUser = await getMe(result.accessToken)
    localStorage.setItem(tokenStorageKey, result.accessToken)
    setUser(currentUser)
    setError('')
    setToken(result.accessToken)
  }

  async function signOut() {
    if (token) {
      try {
        await logout(token)
      } catch (caught) {
        if (!(caught instanceof ApiError && caught.status === 401)) throw caught
      }
    }
    clearSession()
    setError('')
  }

  function retry() {
    setChecking(true)
    setError('')
    setAttempt(previous => previous + 1)
  }

  return { token, user, checking, error, retry, signIn, signOut }
}
