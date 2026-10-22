import { client } from '@/shared/api'
import { useQuery } from '@tanstack/react-query'

export const usePlaylistQuery = (playlistId: string | null) => {
  return useQuery({
    queryKey: ['playlists', 'details', playlistId],
    queryFn: async () => {
      const response = await client.GET('/playlists/{playlistId}', {
        params: { path: { playlistId: playlistId! } },
      })
      return response.data!
    },
    enabled: !!playlistId,
  })
}
