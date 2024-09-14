const jwt = require('jsonwebtoken')
const db = require('../models')

const RefreshToken = db.RefreshToken

const verifyRefreshToken = async (req, res, next) => {
  const { refreshToken } = req.body

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token required' })
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET)
    const storedToken = await RefreshToken.findOne({
      where: { token: refreshToken },
    })

    if (!storedToken) {
      return res.status(403).json({ message: 'Invalid refresh token' })
    }

    req.user_id = decoded.id
    next()
  } catch (error) {
    return res.status(403).json({ message: 'Invalid refresh token' })
  }
}

module.exports = verifyRefreshToken
