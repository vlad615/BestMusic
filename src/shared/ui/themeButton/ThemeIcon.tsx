import type { Theme } from './utils/types'

export const ThemeIcon = ({ theme }: { theme: Theme }) => {
  if (theme === 'dark') {
    return (
      <svg aria-hidden="true" className="size-3" fill="none" viewBox="0 0 24 24">
        <path
          d="M20.2 15.1A8.5 8.5 0 0 1 8.9 3.8 8.5 8.5 0 1 0 20.2 15.1Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    )
  }

  if (theme === 'light') {
    return (
      <svg aria-hidden="true" className="size-3" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
      </svg>
    )
  }

  return (
    <svg aria-hidden="true" className="size-3" fill="none" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 21h8m-4-4v4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  )
}
