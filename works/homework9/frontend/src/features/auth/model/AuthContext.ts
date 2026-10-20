import { createContext, useContext } from 'react'
import type { User } from './types'

export type AuthState = {
  user: User | null
  checking: boolean
  error: string
  retry: () => void
  signIn: (mode: 'login' | 'register', email: string, password: string, repeatPassword?: string) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthState | null>(null)

export function useAuth() {
  const auth = useContext(AuthContext)
  if (!auth) throw new Error('AuthProvider is required')
  return auth
}
