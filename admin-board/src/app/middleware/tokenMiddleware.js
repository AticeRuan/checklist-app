import { logout } from '../features/auth/authSlice'

import { userApi } from '../api/userApi'

const tokenMiddleware = (store) => (next) => async (action) => {
  if (action.error?.status === 401) {
    // Handle token refresh
    const { dispatch } = store

    // Attempt to refresh the token
    try {
      // Call the refresh token endpoint
      const refreshResponse = await dispatch(
        userApi.endpoints.refreshToken.initiate(),
      ).unwrap()

      // Update local storage with new token
      localStorage.setItem('token', refreshResponse.token)

      // Retry the original request with the new token
      // Find the original request action
      const originalRequestAction = action.meta.arg
      const newToken = refreshResponse.token

      // Retry the original request
      dispatch(
        userApi.util.updateQueryData(
          originalRequestAction.endpoint,
          originalRequestAction.originalArgs,
          (draft) => {
            draft.token = newToken
          },
        ),
      )
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
