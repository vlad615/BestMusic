import { AccountBar } from '@/features'
import { Header, ThemeButton } from '@/shared/ui'
import { Outlet } from '@tanstack/react-router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import './index.css'
import { ThemeProvider } from '../providers/ThemeProvider'

export const RootLayout = () => {
  return (
    <ThemeProvider>
      <Header renderAccountBar={<AccountBar />} themeButton={<ThemeButton />} />
      <div className="max-w-7xl mx-auto px-1.5">
        <Outlet />
        <ToastContainer />
      </div>
    </ThemeProvider>
  )
}
