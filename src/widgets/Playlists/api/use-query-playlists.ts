import { client } from '@/shared/api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useQueryPlaylists = (userId?: string, pageNumber?: number, search?: string) => {
  const key = userId ? ['playlists', 'my'] : ['playlists', { search, pageNumber }]
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
