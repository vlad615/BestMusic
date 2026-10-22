import { UpdatePlaylistForm } from '@/features'
import { useMeQuery } from '@/features/oauth/api/use-me-query'
import { AddPlaylistBtn, Playlists } from '@/widgets/Playlists'
import { Navigate } from '@tanstack/react-router'
import { useState } from 'react'

export function MyPlaylistsPage() {
  const [editingPlaylistId, setEditingPlaylistId] = useState<string | null>(null)
  const { data, isPending, isFetching } = useMeQuery()

  if (isPending) return <div>Loading...</div>

  if (!data) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <div className="flex gap-2 flex-wrap items-center justify-between">
        <h1 className="font-semibold text-[clamp(1.5rem,4vw,2.5rem)] mb-2">This is your playlists</h1>
        <AddPlaylistBtn />
      </div>

      <Playlists userId={data.userId} onPlaylistSelected={setEditingPlaylistId} />
      {editingPlaylistId && (
        <UpdatePlaylistForm playlistId={editingPlaylistId} onCancel={() => setEditingPlaylistId(null)} />
      )}
    </>
  )
}
