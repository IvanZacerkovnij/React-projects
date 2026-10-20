import { BrowserRouter } from 'react-router'
import { AuthProvider } from '../features/auth'
import AppRoutes from './routes/AppRoutes'
import './styles/components.css'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
