import { client } from '@/shared/api'
import { accessTokenKey, refreshTokenKey } from '@/shared/lib'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useLogoutMutation = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await client.POST('/auth/logout', {
        body: {
          refreshToken: localStorage.getItem(refreshTokenKey)!,
        },
      })
      return response.data
    },
    onSuccess: () => {
      localStorage.removeItem(refreshTokenKey)
      localStorage.removeItem(accessTokenKey)
      queryClient.resetQueries({
        queryKey: ['auth', 'me'],
      })
    },
  })

  return mutation
}
