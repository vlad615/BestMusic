import { Playlists } from '@/widgets/Playlists'

export function PlaylistsPage() {
  return (
    <>
      <h1 className="font-semibold text-[clamp(1.5rem,4vw,2.5rem)] mb-2">Enjoy music from all users</h1>
      <Playlists isSearchActive />
    </>
  )
}
