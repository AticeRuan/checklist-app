const userCheckController = require('../controllers/userCheckController')

const router = require('express').Router()

const checkIPRange = require('../middlewares/checkIPRange')

// Middleware
const checkIPRange = require('../middlewares/checkIPRange')

router.patch('/:id', checkIPRange, userCheckController.updateUserCheck)

module.exports = router
