import { create } from 'zustand'
import { combine } from 'zustand/middleware'

type themeType = 'light' | 'dark' | 'system'

export const AppStore = create(
  combine(
    {
      theme: (localStorage.getItem('theme') as themeType) || 'light',
    },
    (set) => ({
      setTheme: (theme: themeType) => {
        localStorage.setItem('theme', theme)
        set({ theme })
      },
    })
  )
)
