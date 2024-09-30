const userCheckController = require('../controllers/userCheckController')

const router = require('express').Router()

// Middleware
const checkIPRange = require('../middlewares/checkIPRange')

router.patch('/:id', userCheckController.updateUserCheck)

module.exports = router
