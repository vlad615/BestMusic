import createClient, { type Middleware, type MiddlewareCallbackParams } from 'openapi-fetch'
import type { paths } from './schema'
import { accessTokenKey, refreshTokenKey } from '../lib'

let refreshPromise: Promise<void> | null = null

function makeRefreshToken() {
  if (!refreshPromise) {
    refreshPromise = (async (): Promise<void> => {
      const refreshToken = localStorage.getItem(refreshTokenKey)
      if (!refreshToken) throw new Error('No refresh token')

      const response = await fetch(import.meta.env.VITE_BASE_URL + 'auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'API-KEY': import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify({
          refreshToken: refreshToken,
        }),
      })
      if (!response.ok) {
        localStorage.removeItem(accessTokenKey)
        localStorage.removeItem(refreshTokenKey)
        throw new Error('Refresh token failed')
      }
      const data = await response.json()
      localStorage.setItem(accessTokenKey, data.accessToken)
      localStorage.setItem(refreshTokenKey, data.refreshToken)
    })()

    refreshPromise.finally(() => {
      refreshPromise = null
    })
  }

  return refreshPromise
}

const authMiddleware: Middleware = {
  async onRequest({ request, options }: MiddlewareCallbackParams) {
    const accessToken = localStorage.getItem(accessTokenKey)
    if (accessToken) {
      request.headers.set('Authorization', 'Bearer ' + accessToken)
    }

    ;(request as Request & { _retryRequest: Request })._retryRequest = request.clone()

    return request
  },
  async onResponse({ request, response }) {
    if (response.ok) return response
    if (!response.ok && response.status !== 401) {
      const errorBody = await response.json()
      throw errorBody
    }

    try {
      await makeRefreshToken()
      const originalRequest = (request as Request & { _retryRequest: Request })._retryRequest
      const retryRequest = new Request(originalRequest, {
        headers: new Headers(originalRequest.headers),
      })
      retryRequest.headers.set('Authorization', 'Bearer ' + localStorage.getItem(accessTokenKey))
      return fetch(retryRequest)
    } catch {
      return response
    }
  },
}

export const client = createClient<paths>({
  baseUrl: import.meta.env.VITE_BASE_URL,
  headers: { 'api-key': import.meta.env.VITE_API_KEY },
})

client.use(authMiddleware)
