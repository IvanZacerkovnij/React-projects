import AuthProvider from '../features/auth/model/AuthProvider'
import Catalog from '../features/catalog/ui/Catalog'

export default function App() {
  return <AuthProvider><Catalog /></AuthProvider>
}
