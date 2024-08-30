const userController = require('../controllers/Auth/userController')

const router = require('express').Router()

const requireAuth = require('../middlewares/requireAuth')
const checkRole = require('../middlewares/checkRole')
const checkIPRange = require('../middlewares/checkIPRange')

router.post('/add-new-user', checkIPRange, userController.addUser)

router.post('/login', checkIPRange, userController.loginUser)

router.post('/logout', checkIPRange, userController.logoutUser)

router.patch(
  '/:id/change-password',
  checkIPRange,
  userController.changePassword,
)

module.exports = router
