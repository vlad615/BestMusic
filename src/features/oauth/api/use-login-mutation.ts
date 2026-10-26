import { client } from '@/shared/api'
import { accessTokenKey, refreshTokenKey, сallbackUrl } from '@/shared/lib'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useLogin = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ({ code }: { code: string }) => {
      const response = await client.POST('/auth/login', {
        body: {
          code: code,
          redirectUri: сallbackUrl,
          rememberMe: true,
          accessTokenTTL: '5h',
        },
      })

      if (response.error) {
        throw (response as unknown as { error: Error }).error.message
      }

      return response.data
    },
    onSuccess: (data: { refreshToken: string; accessToken: string }) => {
      localStorage.setItem(refreshTokenKey, data.refreshToken)
      localStorage.setItem(accessTokenKey, data.accessToken)
      queryClient.invalidateQueries({
        queryKey: ['auth', 'me'],
      })
    },
  })

  return mutation
}
