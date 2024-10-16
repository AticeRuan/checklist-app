const crypto = require('crypto')
const { type } = require('os')

const verifyHMAC = (req, res, next) => {
  const signature = req.headers['x-signature']
  const timestamp = req.headers['x-timestamp']
  const customBody = req.headers['x-custom-body']

  if (!signature || !timestamp) {
    return res
      .status(400)
      .json({ message: 'Missing HMAC signature or timestamp' })
  }

  const requestTime = new Date(parseInt(timestamp))
  const currentTime = new Date()
  const timeDiff = Math.abs(currentTime - requestTime) / 1000

  if (timeDiff > 1200) {
    return res.status(400).json({ message: 'Request too old' })
  }

  const secret = process.env.HMAC_SECRET_KEY

  // Generate the payload
  const payload =
    req.method === 'GET' || req.method === 'DELETE' || !customBody
      ? req.originalUrl // Use full URL for GET
      : customBody
      ? customBody
      : '' // Use stringified body for POST/PUT

  const hash = crypto
    .createHmac('sha256', secret)
    .update(payload + timestamp)
    .digest('hex')

  if (hash !== signature) {
    return res.status(403).json({ message: 'Invalid HMAC signature' })
  }

  next()
}

module.exports = verifyHMAC
