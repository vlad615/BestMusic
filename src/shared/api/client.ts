import createClient from 'openapi-fetch'
import type { paths } from './shema'

export const client = createClient<paths>({
  baseUrl: import.meta.env.VITE_BASE_URL,
  headers: { 'api-key': import.meta.env.VITE_API_TOKEN },
})
