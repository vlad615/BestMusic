import { MutationCache, QueryClient } from '@tanstack/react-query'
import { mutationGlobalErrorHandler } from '@/shared/api/errors/handleError'

export type MutationMeta = {
  /**
   * Если 'off' — глобальный обработчик ошибок пропускаем,
   * если 'on' (или нет поля) — вызываем.
   */
  globalErrorHandler?: 'on' | 'off'
}
declare module '@tanstack/react-query' {
  interface Register {
    /**
     * Тип для поля `meta` в useMutation(...)
     */
    mutationMeta: MutationMeta
  }
}
export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: mutationGlobalErrorHandler,
  }),
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: Infinity,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      gcTime: 5 * 60 * 1000,
    },
  },
})
