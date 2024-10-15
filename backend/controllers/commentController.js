const db = require('../models')
const validator = require('validator')
const Comment = db.Comment
//Get all comment will be retrieved when getonechecklist is called

const addComment = async (req, res) => {
  try {
    const { action_id, content, username } = req.body

    // Sanitize input
    const sanitizedActionId = validator.toInt(action_id.toString())
    const sanitizedContent = validator.trim(validator.escape(content))
    const sanitizedUsername = validator.trim(validator.escape(username))

    if (!sanitizedContent) {
      return res.status(400).json({ message: 'Comment cannot be empty' })
    }

    const comment = await Comment.create({
      action_id: sanitizedActionId,
      content: sanitizedContent,
      created_by: sanitizedUsername,
    })
    res.status(201).json(comment)
  } catch (err) {
    console.error('Error creating comment:', err)
    res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
}

module.exports = {
  addComment,
}
