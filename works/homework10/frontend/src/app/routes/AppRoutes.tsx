import { Navigate, Route, Routes } from 'react-router'
import { SessionGate } from '../../features/auth'
import { MePage } from '../../features/profile'
import AppLayout from '../layout/AppLayout'
import HomePage from '../ui/HomePage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route element={<SessionGate />}>
          <Route index element={<HomePage />} />
          <Route path="/me" element={<MePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Route>
    </Routes>
  )
}
