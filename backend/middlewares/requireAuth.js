const db = require('../models')

const jwt = require('jsonwebtoken')

const BlackListedToken = db.BlacklistedToken
const User = db.User

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ err: 'Authroization token required' })
  }

  const token = authorization.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const blacklistedToken = await BlackListedToken.findOne({
      where: { token: token },
    })
    if (blacklistedToken) {
      return res.status(401).json({ message: 'Please login again' })
    }

    const { id } = jwt.verify(token, process.env.SECRET)

    req.user = await User.findOne({ where: { user_id: id } })

    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized: User not found' })
    }

    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res
        .status(401)
        .json({ message: 'Token has expired, please login again' })
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' })
    } else {
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}

module.exports = requireAuth
