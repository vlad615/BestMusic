import { useQuery } from '@tanstack/react-query'
import { client } from '../../../shared/api/client.ts'

export const useMeQuery = () => {
  const query = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const clientResponse = await client.GET('/auth/me')

      if (clientResponse.error) {
        throw clientResponse.error
      }

      if (clientResponse.data === undefined) {
        throw new Error(`Failed to load current user (HTTP ${clientResponse.response.status}).`)
      }

      return clientResponse.data
    },
    retry: false,
  })
  return query
}
