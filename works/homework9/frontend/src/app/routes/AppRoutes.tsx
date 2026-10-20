import { Navigate, Route, Routes } from 'react-router'
import { LoginPage, RegisterPage, SessionGate, useAuth } from '../../features/auth'
import { MePage } from '../../features/profile'
import AppLayout from '../layout/AppLayout'

export default function AppRoutes() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route element={<SessionGate />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/me" element={<MePage />} />
          <Route path="*" element={<Navigate to={user ? '/me' : '/login'} replace />} />
        </Route>
      </Route>
    </Routes>
  )
}
