import type { ReactNode } from 'react'
import { useAuthSession } from '../hooks/useAuthSession'
import { AuthContext } from './AuthContext'

export default function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuthSession()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
