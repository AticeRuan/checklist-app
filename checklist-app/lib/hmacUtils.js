import crypto from 'crypto-js'

// Function to generate HMAC signature and timestamp
export const generateHMAC = (payload, secret) => {
  if (!secret) {
    throw new Error('Secret key is missing or undefined')
  }

  if (!payload) {
    payload = '' // Default to empty string if no payload is provided
  }

  const timestamp = Date.now().toString()

  // Generate the current timestamp
  const signature = crypto
    .HmacSHA256(payload + timestamp, secret)
    .toString(crypto.enc.Hex)

  return { signature, timestamp }
}
