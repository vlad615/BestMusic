import { Outlet } from '@tanstack/react-router'
import './index.css'
import { Header } from '@/shared/ui'
import { AccountBar } from '@/features'
import { ToastContainer } from 'react-toastify/unstyled'

export const RootLayout = () => {
  return (
    <>
      <Header renderAccountBar={<AccountBar />} />
      <div className="max-w-7xl mx-auto px-1.5">
        <Outlet />
        <ToastContainer />
      </div>
    </>
  )
}
