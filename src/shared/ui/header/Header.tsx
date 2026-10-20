import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'

type Props = {
  renderAccountBar: ReactNode
}

export const Header = ({ renderAccountBar }: Props) => {
  return (
    <header className="my-2">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-md bg-background-menu px-2 py-2 text-text">
        <nav className="flex items-center gap-1 text-text-secondary">
          <Link
            className="rounded-sm font-semibold px-1 py-0.5 transition-colors duration-200 hover:bg-primary-light hover:text-text-primary"
            activeProps={{ className: 'bg-primary-light text-text-primary' }}
            activeOptions={{ exact: true }}
            to="/">
            Playlists
          </Link>
          <Link
            className="rounded-sm font-semibold px-1 py-0.5 transition-colors duration-200 hover:bg-primary-light hover:text-text-primary"
            activeProps={{ className: 'bg-primary-light text-text-primary' }}
            to="/my-playlists">
            My Playlists
          </Link>
        </nav>

        <div>{renderAccountBar}</div>
      </div>
    </header>
  )
}
