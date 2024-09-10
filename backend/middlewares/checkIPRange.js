const ipRangeCheck = require('ip-range-check')
const db = require('../models')

const ipAddress = db.IPAddress

// Utility function to get the client's IP address
const getClientIp = (req) => {
  // Check if `X-Forwarded-For` header exists
  const xForwardedFor = req.headers['x-forwarded-for']
  if (xForwardedFor) {
    // `X-Forwarded-For` can contain multiple IPs, take the first one
    return xForwardedFor.split(',')[0].trim()
  }

  // Fallback to `req.ip` or `req.connection.remoteAddress`
  return req.headers['x-real-ip'] || req.ip || req.connection.remoteAddress
}

const checkIPRange = async (req, res, next) => {
  // const allowedRange = process.env.IP_RANGE.split(',')
  const clientIp = getClientIp(req)

  const ipAddresses = await db.IPAddress.findAll({
    attributes: ['ip_address'],
  })

  const allowedRange = ipAddresses.map((ip) => ip.ip_address)

  if (ipRangeCheck(clientIp, allowedRange)) {
    next()
  } else {
    res.status(403).json({
      message:
        'Access restricted: Device is outside the permitted network range.',
    })
  }
}

module.exports = checkIPRange
