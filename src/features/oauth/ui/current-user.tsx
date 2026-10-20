import { Link } from '@tanstack/react-router'
import { useMeQuery } from '../api/use-me-query.ts'
import { LogoutButton } from './logout-button.tsx'

export const CurrentUser = () => {
  const query = useMeQuery()

  if (!query.data) return <span>...</span>

  return (
    <div className="flex gap-2 items-center">
      <Link to="/my-playlists" activeOptions={{ exact: true }}>
        {query.data!.login}
      </Link>
      <LogoutButton />
    </div>
  )
}
