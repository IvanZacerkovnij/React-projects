import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { ApiError } from '../../../shared/api/http'
import { authenticate, getMe, logout } from '../api/authApi'
import type { User } from './types'
import { AuthContext } from './AuthContext'

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState(() => localStorage.getItem('accessToken'))
  const [user, setUser] = useState<User | null>(null)
  const [checking, setChecking] = useState(true)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)

  function clearSession() {
    localStorage.removeItem('accessToken')
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
        else setError(caught instanceof Error ? caught.message : 'Не вдалося перевірити сесію.')
      } finally {
        if (active) setChecking(false)
      }
    }
    void restoreSession()
    return () => { active = false }
  }, [token, attempt])

  useEffect(() => {
    if (!token) return
    let delay = 0
    try {
      const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')))
      if (typeof payload.exp === 'number') delay = Math.max(0, payload.exp * 1000 - Date.now())
    } catch {
      delay = 0
    }
    const timer = window.setTimeout(clearSession, Math.min(delay, 2_147_483_647))
    return () => window.clearTimeout(timer)
  }, [token])

  async function signIn(mode: 'login' | 'register', email: string, password: string, repeatPassword?: string) {
    const result = await authenticate(mode, email, password, repeatPassword)
    const currentUser = await getMe(result.accessToken)
    localStorage.setItem('accessToken', result.accessToken)
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

  return <AuthContext.Provider value={{ user, checking, error, retry, signIn, signOut }}>{children}</AuthContext.Provider>
}

