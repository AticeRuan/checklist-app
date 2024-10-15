const db = require('../models')
const UserCheck = db.UserCheck
const Checklist = db.Checklist
const Template = db.Template
const Action = db.Action
const ListItem = db.ListItem
const Comment = db.Comment
const validator = require('validator')

const updateUserCheck = async (req, res) => {
  try {
    const id = req.params.id
    const { is_checked, checklist_id } = req.body

    // Sanitize input
    const sanitizedIsChecked = validator.toBoolean(is_checked.toString())
    const sanitizedChecklistId = validator.toInt(checklist_id.toString())

    const userCheck = await UserCheck.findOne({ where: { user_check_id: id } })
    if (!userCheck) {
      return res.status(404).json({ error: 'UserCheck not found' })
    }

    await UserCheck.update(
      { is_checked: sanitizedIsChecked },
      { where: { user_check_id: id } },
    )
    const message = sanitizedIsChecked ? 'item checked' : 'item unchecked'

    const checklist = await Checklist.findOne({
      where: { checklist_id: sanitizedChecklistId },
      include: [
        {
          model: Template,
          attributes: ['title', 'is_environment_related', 'is_machine_related'],
        },
        {
          model: UserCheck,
          attributes: ['user_check_id', 'is_checked', 'has_action'],
          include: [
            {
              model: Action,
              attributes: [
                'action_id',
                'content',
                'image_url',
                'completed',
                'updatedAt',
              ],
              include: [{ model: Comment }],
            },
            {
              model: ListItem,
              attributes: ['keyword', 'description'],
            },
          ],
        },
      ],
    })
    res.status(200).json({ message: message, checklist: checklist })
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

const getUserChecksByChecklist = async (req, res) => {
  const { checklist_id } = req.query

  try {
    // Sanitize input
    const sanitizedChecklistId = validator.toInt(checklist_id.toString())

    const userChecks = await UserCheck.findAll({
      where: { checklist_id: sanitizedChecklistId },
      include: [
        {
          model: Action,
          include: [{ model: Comment }],
        },
        {
          model: ListItem,
        },
      ],
    })
    res.status(200).json(userChecks)
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

module.exports = {
  updateUserCheck,
  getUserChecksByChecklist,
}
