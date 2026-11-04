import { client, playlistsKeys, queryErrorHandlerForRHFFactory } from '@/shared/api'
import { isJsonApiErrorDocument, parseJsonApiErrors } from '@/shared/api/errors/isErrorWithMessage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const useUploadCoverMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ file, playlistId }: { file: File; playlistId: string }) => {
      const response = await client.POST(`/playlists/{playlistId}/images/main`, {
        params: { path: { playlistId } },
        body: { file },
        bodySerializer: ({ file }) => {
          const formData = new FormData()
          formData.append('file', file)
          return formData
        },
      })

      if (response.error) throw response.error

      return response.data
    },
    onError: (error) => {
      toast.error(error.message)
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
