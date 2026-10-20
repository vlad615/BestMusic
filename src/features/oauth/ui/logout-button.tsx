import { useLogoutMutation } from '../api/use-logout-mutation'

export const LogoutButton = () => {
  const mutation = useLogoutMutation()

  const handleLogoutClick = () => {
    mutation.mutate()
  }

  return (
    <button
      className="cursor-pointer rounded-md bg-primary px-1 py-0.5 font-semibold text-white transition-colors duration-200 hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      onClick={handleLogoutClick}>
      Logout
    </button>
  )
}
