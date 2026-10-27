import { AccountBar } from '@/features'
import { Header } from '@/shared/ui'
import { Outlet } from '@tanstack/react-router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import './index.css'

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
