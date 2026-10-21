import { Outlet } from 'react-router'
import Header from './Header'
import { AuthModal } from '../../features/auth'

export default function AppLayout() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-lg px-5 py-14 sm:py-20">
        <Outlet />
      </main>
      <AuthModal />
    </>
  )
}
