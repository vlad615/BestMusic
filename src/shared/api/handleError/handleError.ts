import { toast } from 'react-toastify'
import { isErrorWithMessage } from './isErrorWithMessage'

export const handleErrors = (error: any) => {
  if (error) {
    switch (error.status) {
      case 'FETCH_ERROR':
      case 'PARSING_ERROR':
      case 'CUSTOM_ERROR':
      case 'TIMEOUT_ERROR':
        toast(error.error, { type: 'error', theme: 'colored' })
        break

      case 404:
        if (isErrorWithMessage(error.data, 'status_message')) {
          toast(error.data.status_message, { type: 'error', theme: 'colored' })
        } else {
          toast(JSON.stringify(error.data), { type: 'error', theme: 'colored' })
        }
        break

      case 401:
      case 429:
        if (isErrorWithMessage(error.data, 'status_message')) {
          toast(error.data.status_message, { type: 'error', theme: 'colored' })
        } else {
          toast(JSON.stringify(error.data), { type: 'error', theme: 'colored' })
        }
        break

      default:
        if (error.status >= 500 && error.status < 600) {
          toast('Server error occurred. Please try again later.', {
            type: 'error',
            theme: 'colored',
          })
        } else {
          toast('Some error occurred', { type: 'error', theme: 'colored' })
        }
    }
  }
}
