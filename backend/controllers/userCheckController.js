const db = require('../models')
const UserCheck = db.UserCheck

const updateUserCheck = async (req, res) => {
  try {
    const id = req.params.id
    const { is_checked } = req.body

    const userCheck = await UserCheck.findOne({ where: { user_check_id: id } })
    if (!userCheck) {
      return res.status(404).json({ error: 'UserCheck not found' })
    }

    await UserCheck.update(
      { is_checked: is_checked },
      { where: { user_check_id: id } },
    )
    const message = is_checked ? 'item checked' : 'item unchecked'
    res.status(200).json({ message: message })
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

module.exports = {
  updateUserCheck,
}
