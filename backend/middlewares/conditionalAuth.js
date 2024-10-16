const verifyJWT = require('./requireAuth')
const verifyHMAC = require('./verifyHMAC')

const conditionalAuth = (req, res, next) => {
  const authorization = req.headers['authorization']
  const signature = req.headers['x-signature']

  // If 'authorization' header exists, use JWT authentication
  if (authorization) {
    return verifyJWT(req, res, next) // Call JWT middleware
  }

  // If 'x-signature' header exists, use HMAC authentication
  if (signature) {
    return verifyHMAC(req, res, next) // Call HMAC middleware
  }

  // If neither JWT nor HMAC is provided, reject the request
  return res.status(401).json({ message: 'Authentication method missing' })
}

module.exports = conditionalAuth
