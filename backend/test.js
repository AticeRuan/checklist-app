require('dotenv').config()
const crypto = require('crypto')

// Define the secret key
const secretKey = process.env.HMAC_SECRET_KEY // Replace this with your actual secret key

if (!secretKey) {
  throw new Error('Secret key is undefined or invalid')
}

const requestBody = { machine_id: '23456444' }

// Stringify the request body
const payload = JSON.stringify(requestBody)
console.log('Payload:', payload)
console.log('Type of Payload:', typeof payload)
const timestamp = Date.now().toString() // Current timestamp

try {
  // Generate the HMAC signature
  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(payload + timestamp)
    .digest('hex')

  console.log('Signature:', signature)
  console.log('Timestamp:', timestamp)
} catch (err) {
  console.error('Error generating HMAC signature:', err)
}
