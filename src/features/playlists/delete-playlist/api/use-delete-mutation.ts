import { client, playlistsKeys, type SchemaGetPlaylistsOutput } from '@/shared/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (playlistId: string) => {
      const response = await client.DELETE('/playlists/{playlistId}', { params: { path: { playlistId } } })

      return response.data
    },
    onSuccess: (data, playlistId: string) => {
      queryClient.setQueriesData({ queryKey: playlistsKeys.myList() }, (oldData: SchemaGetPlaylistsOutput) => {
        console.log(oldData)

        return {
          ...oldData,
          data: oldData.data.filter((p) => p.id !== playlistId),
        }
      })
    },
  })
}
