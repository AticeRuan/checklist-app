const db = require('../models')
const jwt = require('jsonwebtoken')

const User = db.User

const checkRole = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ err: 'Authorization token required' })
  }

  const token = authorization.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRET)

    req.user = await User.findOne({ where: { user_id: id } })

    if (req.user.role == 'admin') {
      next()
    } else {
      return res.status(403).json({ error: 'Forbidden: Access denied' })
    }
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

module.exports = checkRole
