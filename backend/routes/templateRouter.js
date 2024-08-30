const templateController = require('../controllers/templateController')

const router = require('express').Router()

// Middleware
const checkIPRange = require('../middlewares/checkIPRange')
const requireAuth = require('../middlewares/requireAuth')

router.post('/', checkIPRange, templateController.addTemplate)
router.get(
  '/all/:status',
  checkIPRange,
  templateController.getTemplatesByStatus,
)
router.get('/:id', checkIPRange, templateController.getOneTemplate)
router.patch('/:id', checkIPRange, templateController.updateTemplate)
router.delete('/:id', checkIPRange, templateController.deleteTemplate)

module.exports = router
