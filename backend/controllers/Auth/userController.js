const db = require('../../models')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = db.User
const BlackListedToken = db.BlacklistedToken

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET)
}

const addUser = async (req, res) => {
  const { user_name, role } = req.body

  if (!user_name) {
    return res.status(400).json({ message: 'Username is required' })
  }

  // Sanitize user input
  const sanitizedUserName = validator.trim(validator.escape(user_name))
  const sanitizedRole = role ? validator.trim(validator.escape(role)) : role

  const existingUser = await User.findOne({
    where: { user_name: sanitizedUserName },
  })

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' })
  }

  const password = '00000000'
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = await User.create({
      user_name: sanitizedUserName,
      hashed_password: hashedPassword,
      role: sanitizedRole,
    })
    res.status(201).json(user)
  } catch (err) {
    console.error('Error creating user:', err)
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

const deleteUser = async (req, res) => {
  const id = req.params.id
  try {
    const user = await User.findOne({ where: { user_id: id } })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    await User.destroy({ where: { user_id: id } })
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (err) {
    console.error('Error deleting user:', err)
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}
const updateUserRole = async (req, res) => {
  const id = req.params.id

  const user = await User.findOne({ where: { user_id: id } })
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  // Sanitize user input
  const sanitizedBody = {}
  if (req.body.role) {
    sanitizedBody.role = validator.trim(validator.escape(req.body.role))
  }

  try {
    await User.update(sanitizedBody, {
      where: { user_id: id },
    })

    // Fetch the updated user data
    const updatedUser = await User.findOne({ where: { user_id: id } })

    res.status(200).json(updatedUser)
  } catch (err) {
    console.error('Error updating user:', err)
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

const loginUser = async (req, res) => {
  const { user_name, password } = req.body

  try {
    if (!user_name || !password) {
      return res
        .status(400)
        .json({ message: 'Username and password are required' })
    }

    // Sanitize user input
    const sanitizedUserName = validator.trim(validator.escape(user_name))
    const sanitizedPassword = validator.trim(password) // Avoid escape for passwords

    const user = await User.findOne({ where: { user_name: sanitizedUserName } })

    if (!user) {
      return res.status(404).json({ message: 'Invalid username' })
    }

    const isPasswordValid = await bcrypt.compare(
      sanitizedPassword,
      user.hashed_password,
    )

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

  // Ensure authorization token exists
  if (!authorization) {
    return res.status(401).json({ message: 'Authorization token required' })
  }

  const token = authorization.split(' ')[1]

  try {
    const expiredAt = new Date()

    await BlackListedToken.create({ token, expires_at: expiredAt })

    res.status(200).json({ message: 'Logged out successfully' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const changePassword = async (req, res) => {
  const { user_name, password, newPassword } = req.body
  try {
    // Sanitize user input
    const sanitizedUserName = validator.trim(validator.escape(user_name))
    const sanitizedPassword = validator.trim(password) // Avoid escape for passwords
    const sanitizedNewPassword = validator.trim(newPassword) // Avoid escape for passwords

    const user = await User.findOne({ where: { user_name: sanitizedUserName } })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    const isPasswordValid = await bcrypt.compare(
      sanitizedPassword,
      user.hashed_password,
    )
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' })
    }
    if (!validator.isStrongPassword(sanitizedNewPassword)) {
      return res.status(400).json({ message: 'Password is not strong enough' })
    }
    const hashedPassword = await bcrypt.hash(sanitizedNewPassword, 10)
    await User.update(
      { hashed_password: hashedPassword },
      { where: { user_name: sanitizedUserName } },
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

const resetPassword = async (req, res) => {
  const user_id = req.params.id
  try {
    const user = await User.findOne({ where: { user_id: user_id } })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    const newPassword = '00000000'

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await User.update(
      { hashed_password: hashedPassword },
      { where: { user_id } },
    )
    res.status(200).json({ message: 'Password reset successfully' })
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
  updateUserRole,
  resetPassword,
}
