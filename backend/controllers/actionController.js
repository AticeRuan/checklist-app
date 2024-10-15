const db = require('../models')
const validator = require('validator')
const UserCheck = db.UserCheck
const Action = db.Action
const Comment = db.Comment
const Checklist = db.Checklist
const ListItem = db.ListItem
const Template = db.Template

const addAction = async (req, res) => {
  try {
    const { user_check_id, content, image_url, sender, site_id } = req.body

    // Sanitize user input
    const sanitizedUserCheckId = validator.trim(
      validator.escape(user_check_id.toString()),
    )
    const sanitizedContent = validator.trim(validator.escape(content))
    const sanitizedImageUrl = image_url
      ? validator.trim(validator.escape(image_url))
      : image_url
    const sanitizedSender = validator.trim(validator.escape(sender))
    const sanitizedSiteId = site_id
      ? validator.trim(validator.escape(site_id.toString()))
      : site_id

    const userCheck = await UserCheck.findOne({
      where: { user_check_id: sanitizedUserCheckId },
    })
    if (!userCheck) {
      return res.status(404).json({ error: 'UserCheck not found' })
    }

    await UserCheck.update(
      { has_action: true },
      { where: { user_check_id: sanitizedUserCheckId } },
    )

    const action = await Action.create({
      user_check_id: sanitizedUserCheckId,
      content: sanitizedContent,
      image_url: sanitizedImageUrl,
      sender: sanitizedSender,
      site_id: sanitizedSiteId,
    })
    res.status(200).json(action)
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

const getActions = async (req, res) => {
  try {
    const actions = await Action.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Comment,
        },
      ],
    })

    res.status(200).json(actions)
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

const getActionsBySite = async (req, res) => {
  try {
    const { site_id } = req.query

    const actions = await Action.findAll({
      where: { site_id: site_id },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Comment,
        },
      ],
    })

    res.status(200).json(actions)
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

const updateAction = async (req, res) => {
  try {
    const id = req.params.id
    const { content, image_url, sender } = req.body

    // Sanitize user input
    const sanitizedContent = validator.trim(validator.escape(content))
    const sanitizedImageUrl = image_url
      ? validator.trim(validator.escape(image_url))
      : image_url
    const sanitizedSender = validator.trim(validator.escape(sender))

    const action = await Action.findOne({ where: { action_id: id } })
    if (!action) {
      return res.status(404).json({ error: 'Action not found' })
    }

    await Action.update(
      {
        content: sanitizedContent,
        image_url: sanitizedImageUrl,
        sender: sanitizedSender,
        is_read: false,
      },
      { where: { action_id: id } },
    )
    const updatedAction = await Action.findOne({
      where: { action_id: id },
      include: [{ model: Comment }],
    })

    res.status(200).json(updatedAction)
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

const deleteAction = async (req, res) => {
  try {
    const id = req.params.id

    const action = await Action.findOne({ where: { action_id: id } })
    if (!action) {
      return res.status(404).json({ error: 'Action not found' })
    }

    await Action.destroy({ where: { action_id: id } })
    res.status(200).json({ message: 'Action deleted' })
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

const getActionById = async (req, res) => {
  try {
    const id = req.params.id

    const action = await Action.findOne({
      where: { action_id: id },
      include: [
        { model: Comment },
        {
          model: UserCheck,
          attributes: ['checklist_id', 'listitem_id'],
          include: [
            {
              model: Checklist,
              attributes: ['machine_id'],
              include: [{ model: Template, attributes: ['title'] }],
            },
            { model: ListItem, attributes: ['keyword'] },
          ],
        },
        // { model: Checklist, attributes: ['machine_id', 'title'] },
      ],
    })

    if (action) {
      res.status(200).json(action)
    } else {
      res.status(404).send('Action not found')
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

const getActionByUserAndSite = async (req, res) => {
  try {
    const { username, site_id } = req.query

    const action = await Action.findAll({
      order: [['createdAt', 'DESC']],
      where: { sender: username, site_id: site_id },
      include: [
        { model: Comment },
        // {
        //   model: UserCheck,
        //   attributes: ['checklist_id', 'listitem_id'],
        //   include: [
        //     {
        //       model: Checklist,
        //       attributes: ['machine_id'],
        //       include: [{ model: Template, attributes: ['title'] }],
        //     },
        //     { model: ListItem, attributes: ['keyword'] },
        //   ],
        // },
        // // { model: Checklist, attributes: ['machine_id', 'title'] },
      ],
    })

    if (action) {
      res.status(200).json(action)
    } else {
      res.status(404).send('Action not found')
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

const readAction = async (req, res) => {
  try {
    const id = req.params.id

    const action = await Action.findOne({ where: { action_id: id } })
    if (!action) {
      return res.status(404).json({ error: 'Action not found' })
    }

    await Action.update({ is_read: true }, { where: { action_id: id } })
    const updatedAction = await Action.findOne({
      where: { action_id: id },
      include: [{ model: Comment }],
    })
    res.status(200).json(updatedAction)
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

const completeAction = async (req, res) => {
  try {
    const id = req.params.id

    const action = await Action.findOne({ where: { action_id: id } })
    if (!action) {
      return res.status(404).json({ error: 'Action not found' })
    }

    await Action.update({ completed: true }, { where: { action_id: id } })
    const updatedAction = await Action.findOne({
      where: { action_id: id },
      include: [{ model: Comment }],
    })
    res.status(200).json(updatedAction)
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

module.exports = {
  addAction,
  getActionsBySite,
  updateAction,
  deleteAction,
  readAction,
  completeAction,
  getActionById,
  getActionByUserAndSite,
}
