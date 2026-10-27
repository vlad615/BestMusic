import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { mutationGlobalErrorHandler, queryErrorHandler } from '@/shared/api/errors/handleError'

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
  queryCache: new QueryCache({
    onError: (error, query) => queryErrorHandler(error),
  }),
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
