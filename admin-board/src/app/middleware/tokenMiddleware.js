import { logout } from '../features/auth/authSlice'

import { userApi } from '../api/userApi'

const tokenMiddleware = (store) => (next) => async (action) => {
  if (action.error?.status === 401 || action.error?.status === 400) {
    // Handle token refresh
    const { dispatch } = store

    // Attempt to refresh the token
    try {
      dispatch(logout())
      alert('Invalid token, please log in again.')
      window.location.href = '/login'
    } catch (refreshError) {
      // Logout user if refresh fails
      dispatch(logout())
      alert('Your session has expired. Please log in again.')
      window.location.href = '/login'

      console.error('Failed to refresh token:', refreshError)
    }
  } else if (action.error?.status === 403) {
    // Handle 403 errors
    alert('Your session has expired. Please log in again.')
    window.location.href = '/login'
  }

  return next(action)
}

export default tokenMiddleware
