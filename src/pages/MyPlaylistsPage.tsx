import { Playlists } from '@/widgets/Playlists'
import { useMeQuery } from '@/features/oauth/api/use-me-query'
import { Navigate } from '@tanstack/react-router'
import { AddPlaylistForm } from '@/features/playlists/add-playlist/ui/AddPlaylistForm'

export function MyPlaylistsPage() {
  const { data, isPending, isFetching } = useMeQuery()

  if (isPending) return <div>Loading...</div>

  if (!data) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <h1 className="font-semibold text-[clamp(1.5rem,4vw,2.5rem)] mb-2">This is your playlists</h1>
      <AddPlaylistForm />
      <Playlists userId={data.userId} />
    </>
  )
}
