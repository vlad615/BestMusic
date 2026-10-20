import { OAuthCallbackPage } from '@/pages'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/oauth/callback')({
  component: OAuthCallbackPage,
})
