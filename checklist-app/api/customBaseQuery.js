import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { APPWRITE_ENDPOINT } from '@env'

// Define  base query function
const baseQuery = fetchBaseQuery({
  baseUrl: `${APPWRITE_ENDPOINT}/api`,
})

// Define  custom base query function
const customBaseQuery = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)

  return result
}

export default customBaseQuery
