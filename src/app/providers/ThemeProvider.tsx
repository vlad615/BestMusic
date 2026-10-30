import { useEffect, type ReactNode } from 'react'
import { AppStore } from '../store/store'

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const theme = AppStore((state) => state.theme)

  useEffect(() => {
    const root = document.documentElement
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
    const applyTheme = (isSystemDark = systemTheme.matches) => {
      const isDark = theme === 'system' ? isSystemDark : theme === 'dark'
      root.classList.toggle('dark', isDark)
      root.classList.toggle('light', !isDark)
    }

    applyTheme()

    if (theme !== 'system') return

    const handleSystemThemeChange = (event: MediaQueryListEvent) => applyTheme(event.matches)
    systemTheme.addEventListener('change', handleSystemThemeChange)

    return () => systemTheme.removeEventListener('change', handleSystemThemeChange)
  }, [theme])

  return <>{children}</>
}
