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

  return result
}

export default customBaseQuery
