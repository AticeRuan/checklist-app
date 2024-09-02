import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define  base query function
const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_URL}/api`,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

// Define  custom base query function
const customBaseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    // Handle token expiration
    alert('Your session has expired. Please log in again.')
    window.location.href = '/login' // Redirect to login page
  }

  return result
}

export default customBaseQuery
