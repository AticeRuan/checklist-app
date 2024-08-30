const commentController = require('../controllers/commentController')

const router = require('express').Router()

// Middleware
const checkIPRange = require('../middlewares/checkIPRange')

router.post('/:id', checkIPRange, commentController.addComment)
module.exports = router
