export type User = { id: string; email: string }
export type AuthResponse = { accessToken: string; expiresAt: string; email: string }
export type AuthMode = 'login' | 'register'
export type AuthFormValues = { email: string; password: string; repeatPassword: string }

