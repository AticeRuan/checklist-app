const db = require('../models')

const jwt = require('jsonwebtoken')

const BlackListedToken = db.BlacklistedToken
const User = db.User
const RefreshToken = db.RefreshToken

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.SECRET, { expiresIn: '10d' })
}

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ err: 'Authroization token required' })
  }

  const token = authorization.split(' ')[1]
  const refreshToken = req.body.refreshToken

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

    const decoded = jwt.verify(token, process.env.SECRET)
    const user = await User.findOne({ where: { user_id: decoded.id } })

    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    req.user = user

    next()
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      // Handle expired token and refresh token logic
      if (refreshToken) {
        try {
          const refreshDecoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_SECRET,
          )
          const storedToken = await RefreshToken.findOne({
            where: { token: refreshToken },
          })

          if (!storedToken) {
            return res.status(403).json({ message: 'Invalid refresh token' })
          }

          // Generate a new access token
          const newToken = createToken(refreshDecoded.id)
          res.status(401).json({
            message: 'Token has expired, new token issued.',
            token: newToken,
          })
        } catch (refreshError) {
          return res.status(403).json({ message: 'Invalid refresh token' })
        }
      } else {
        return res
          .status(401)
          .json({ message: 'Token has expired, please log in again.' })
      }
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token' })
    } else {
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}

module.exports = requireAuth
