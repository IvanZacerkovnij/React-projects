import { createContext } from 'react'
import type { User } from './types'

export type AuthState = {
  token: string | null
  user: User | null
  checking: boolean
  error: string
  retry: () => void
  signIn: (mode: 'login' | 'register', email: string, password: string, repeatPassword?: string) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthState | null>(null)
