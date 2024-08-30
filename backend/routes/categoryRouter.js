const categoryController = require('../controllers/categoryController')

const router = require('express').Router()

// Middleware
const requireAuth = require('../middlewares/requireAuth')
const checkRole = require('../middlewares/checkRole')
const checkIPRange = require('../middlewares/checkIPRange')

router.post('/', checkIPRange, categoryController.addCategory)
router.get('/', checkIPRange, categoryController.getAllCategory)
router.get('/:id', checkIPRange, categoryController.getOneCategory)
router.patch(
  '/:id',
  checkIPRange,
  requireAuth,
  categoryController.updateCategory,
)

module.exports = router
