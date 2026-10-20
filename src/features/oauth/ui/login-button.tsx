import { сallbackUrl } from '@/shared/lib'
import { useLogin } from '../api/use-login-mutation'

export const LoginButton = () => {
  const mutation = useLogin()

  const handleOauthMessage = (event: MessageEvent) => {
    window.removeEventListener('message', handleOauthMessage)
    if (event.origin !== document.location.origin) {
      console.warn('origin not match')
      return
    }
    const code = event.data.code
    if (!code) {
      console.warn('no code in message')
      return
    }

    mutation.mutate({ code })
  }

  const handleLoginClick = () => {
    window.addEventListener('message', handleOauthMessage)
    window.open(
      `https://musicfun.it-incubator.app/api/1.0/auth/oauth-redirect?callbackUrl=${сallbackUrl}`,
      'apihub-oauth2',
      'width=500,height=600'
    )
  }

  return (
    <button
      className="cursor-pointer rounded-md bg-primary px-1 py-0.5 font-semibold text-white transition-colors duration-200 hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      onClick={handleLoginClick}
      type="button">
      Login with ApiHUB
    </button>
  )
}
