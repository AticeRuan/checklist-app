const userCheckController = require('../controllers/userCheckController')

const router = require('express').Router()

// Middleware
const checkIPRange = require('../middlewares/checkIPRange')
const verifyHMAC = require('../middlewares/verifyHMAC')

router.patch('/:id', verifyHMAC, userCheckController.updateUserCheck)
router.get('/', verifyHMAC, userCheckController.getUserChecksByChecklist)

module.exports = router
