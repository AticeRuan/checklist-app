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
  const result = await baseQuery(args, api, extraOptions)

  if (result.error?.status === 403 || result.error?.status === 401) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return result
}

export default customBaseQuery
