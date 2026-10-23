import { useMutation, useQueryClient } from '@tanstack/react-query'
import { playlistsKeys, client, type SchemaCreatePlaylistRequestPayload } from '@/shared/api'

export const useAddPlaylistMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ data }: SchemaCreatePlaylistRequestPayload) => {
      const response = await client.POST('/playlists', {
        body: { data: { type: 'playlists', attributes: data.attributes } },
      })

      if (response.error) {
        const message =
          response.response.status === 403
            ? 'Playlist creation limit exceeded.'
            : `Failed to create playlist (HTTP ${response.response.status}).`
        throw new Error(message)
      }

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: playlistsKeys.myList(),
        refetchType: 'all',
      })
    },
    meta: { globalErrorHandler: 'on' },
  })
}
