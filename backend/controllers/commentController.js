const db = require('../models')

const Comment = db.Comment
//Get all comment will be retrieved when getonechecklist is called

const addComment = async (req, res) => {
  try {
    const { action_id, content, username } = req.body
    if (!content) {
      return res.status(400).json({ message: 'Comment cannot be empty' })
    }
    const comment = await Comment.create({
      action_id: action_id,
      content: content,
      created_by: username,
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
