import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define  base query function
const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_URL}/api`,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token')

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    // if (refreshToken) {
    //   headers.set('Refresh-Token', refreshToken)
    // }
    return headers
  },
})

// Define  custom base query function
const customBaseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error?.status === 401) {
    // Refresh the token if necessary
    const refreshToken = localStorage.getItem('refreshToken')

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: '/users/refresh-token',
          method: 'POST',
          body: { refreshToken },
        },
        api,
        extraOptions,
      )

      if (refreshResult.data) {
        // Store the new refresh token
        localStorage.setItem('refreshToken', refreshResult.data.refreshToken)

        // Retry the original request with the new token
        result = await baseQuery(args, api, extraOptions)
      } else {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
        console.log('Failed to refresh token')
      }
    }
  }

  if (result.error?.status === 403) {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
  }

  return result
}

export default customBaseQuery
