const db = require('../../models')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = db.User
const BlackListedToken = db.BlacklistedToken

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: '1h' })
}

const addUser = async (req, res) => {
  const { username, password, role } = req.body

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Username and password are required' })
  }

  const existingUser = await User.findOne({ where: { user_name: username } })

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' })
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ message: 'Password is not strong enough' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = await User.create({
      user_name: username,
      hashed_password: hashedPassword,
      role,
    })
    res.status(201).json({ message: 'User created successfully' })
  } catch (err) {
    console.error('Error creating user:', err)
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

const deleteUser = async (req, res) => {
  const { username } = req.body

  if (!username) {
    return res.status(400).json({ message: 'Username is required' })
  }

  try {
    const user = await User.findOne({ where: { user_name: username } })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    await User.destroy({ where: { user_name: username } })
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (err) {
    console.error('Error deleting user:', err)
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

const loginUser = async (req, res) => {
  const { username, password } = req.body

  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Username and password are required' })
    }

    const user = await User.findOne({ where: { user_name: username } })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashed_password)

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' })
    }

    const token = createToken(user.user_id)
    const role = user.role
    const name = user.user_name

    res.status(200).json({ token, role, name })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const logoutUser = async (req, res) => {
  const { authorization } = req.headers

  const token = authorization.split(' ')[1]
  const decoded = jwt.verify(token, process.env.SECRET)
  const expiredAt = new Date(decoded.exp * 1000)

  try {
    await BlackListedToken.create({ token, expires_at: expiredAt })
    res.status(200).json({ message: 'Logged out successfully' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const changePassword = async (req, res) => {
  const { username, password, newPassword } = req.body
  try {
    const user = await User.findOne({ where: { user_name: username } })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    const isPasswordValid = await bcrypt.compare(password, user.hashed_password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' })
    }
    if (!validator.isStrongPassword(newPassword)) {
      return res.status(400).json({ message: 'Password is not strong enough' })
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await User.update(
      { hashed_password: hashedPassword },
      { where: { user_name: username } },
    )
    res.status(200).json({ message: 'Password changed successfully' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  addUser,
  loginUser,
  logoutUser,
  changePassword,
  deleteUser,
  getAllUsers,
}
