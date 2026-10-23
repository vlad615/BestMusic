import { client, playlistsKeys } from '@/shared/api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useQueryPlaylists = (userId?: string, pageNumber?: number, search?: string) => {
  const key = userId ? playlistsKeys.myList() : playlistsKeys.list({ pageNumber, search })
  const queryParams = userId ? { userId } : { pageNumber, search }

  return useQuery({
    queryKey: key,
    queryFn: async ({ signal }) => {
      const responce = await client.GET('/playlists', {
        params: {
          query: queryParams,
        },
        signal,
      })
      if (responce.error) {
        throw (responce as unknown as { error: Error }).error.message
      }
      return responce.data
    },
    placeholderData: keepPreviousData,
  })
}
