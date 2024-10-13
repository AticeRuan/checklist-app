const userCheckController = require('../controllers/userCheckController')

const router = require('express').Router()

// Middleware
const checkIPRange = require('../middlewares/checkIPRange')

router.patch('/:id', userCheckController.updateUserCheck)
router.get('/', userCheckController.getUserChecksByChecklist)

module.exports = router
