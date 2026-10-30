import { AppStore } from '@/app/store/store'
import { themes } from './utils/types'
import { ThemeIcon } from './ThemeIcon'

export const ThemeButton = () => {
  'use no memo'

  const theme = AppStore((state) => state.theme)
  const setTheme = AppStore((state) => state.setTheme)
  const selectedTheme = themes.find((item) => item.value === theme) ?? themes[0]
  console.log(theme, selectedTheme)

  return (
    <details className="group relative">
      <summary
        aria-label={`Theme: ${selectedTheme.label}`}
        className="flex list-none cursor-pointer items-center gap-2 rounded-sm border-0 bg-background-menu px-1.5 py-1 text-text transition-colors hover:bg-primary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
        <ThemeIcon theme={selectedTheme.value} />
        <span>{selectedTheme.label}</span>
      </summary>
      <div className="absolute right-0 z-50 mt-1 min-w-full w-max rounded-sm border border-border bg-surface p-1 text-text shadow-md">
        {themes.map(({ value, label }) => (
          <button
            aria-pressed={theme === value}
            className={`flex w-full items-center gap-2 rounded-sm px-1.5 py-1 text-left transition-colors hover:bg-primary-light hover:text-text-primary focus-visible:bg-primary-light focus-visible:outline-none ${
              theme === value ? 'bg-primary-light font-semibold text-text-primary' : ''
            }`}
            key={value}
            onClick={(event) => {
              setTheme(value)
              event.currentTarget.closest('details')?.removeAttribute('open')
            }}
            type="button">
            <ThemeIcon theme={value} />
            {label}
          </button>
        ))}
      </div>
    </details>
  )
}
