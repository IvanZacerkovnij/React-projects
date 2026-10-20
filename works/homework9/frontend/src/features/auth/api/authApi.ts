import { request } from '../../../shared/api/http'
import type { AuthResponse, User } from '../model/types'

export function authenticate(mode: 'login' | 'register', email: string, password: string, repeatPassword?: string) {
  return request<AuthResponse>(`auth/${mode}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, ...(mode === 'register' ? { repeat_password: repeatPassword } : {}) }),
  })
}

export function getMe(token: string) {
  return request<User>('auth/me', { headers: { Authorization: `Bearer ${token}` } })
}

export function logout(token: string) {
  return request<void>('auth/logout', { method: 'POST', headers: { Authorization: `Bearer ${token}` } })
}
