import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { generateHMAC } from '../lib/hmacUtils'
import { SECRET_KEY, APPWRITE_ENDPOINT } from '@env'

// Define  base query function
const baseQuery = fetchBaseQuery({
  baseUrl: `${APPWRITE_ENDPOINT}/api`,
  prepareHeaders: (headers, api, extraOptions) => {
    const customUrl = headers.get('x-custom-url') // Full URL for GET
    const customBody = headers.get('x-custom-body') // Body for POST/PUT
    const customMethod = headers.get('x-custom-method') || 'GET' // Method (GET/POST)

    // Set the payload: use full URL for GET and request body for POST/PUT
    const payload =
      customMethod === 'GET' || customMethod === 'DELETE' || !customBody
        ? customUrl // Full URL as payload for GET
        : customBody
        ? customBody
        : '' // Stringified body for POST/PUT

    // Should log '/api/sites' for GET

    const timestamp = Date.now().toString() // Generate the timestamp

    // Generate HMAC signature
    const { signature } = generateHMAC(payload, SECRET_KEY)

    // Set headers
    headers.set('x-signature', signature)
    headers.set('x-timestamp', timestamp)

    if (customMethod !== 'GET') {
      console.log('Payload at client:', payload)
      console.log('Custom URL:', customUrl) // This should log '/api/sites'
      console.log('Custom Body:', customBody)
      console.log('type of body:', typeof customBody) // This should be empty for GET
      console.log('Custom Method:', customMethod) // This should log 'GET'

      console.log('Timestamp at client:', timestamp)
      console.log('Signature at client:', signature)
    }

    return headers
  },
})

// Define  custom base query function
const customBaseQuery = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)

  return result
}

export default customBaseQuery
