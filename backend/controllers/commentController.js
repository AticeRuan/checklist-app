const db = require('../models')

const Comment = db.Comment
//Get all comment will be retrieved when getonechecklist is called

const addComment = async (req, res) => {
  try {
    const user_check_id = req.params.id
    const { content } = req.body
    if (!content) {
      return res.status(400).json({ message: 'Comment cannot be empty' })
    }
    const comment = await Comment.create({
      user_check_id: user_check_id,
      content: content,
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
