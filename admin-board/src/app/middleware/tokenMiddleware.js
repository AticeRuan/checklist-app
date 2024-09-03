import { logout } from '../features/auth/authSlice'

const tokenMiddleware = (store) => (next) => (action) => {
  if (action.error?.status === 401) {
    store.dispatch(logout())
    alert('Your session has expired. Please log in again.')
    window.location.href = '/login'

    console.log('tokenmiddleware triggered.')
  }
  return next(action)
}

export default tokenMiddleware
