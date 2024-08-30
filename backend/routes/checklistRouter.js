const checklistController = require('../controllers/checklistController')

const router = require('express').Router()

// Middleware

const checkIPRange = require('../middlewares/checkIPRange')

router.post(
  '/create/:id',
  checkIPRange,
  checklistController.initializeChecklist,
)
router.get(
  '/all/:id',
  checkIPRange,
  checklistController.getAllChecklistsBySiteId,
)

router.get('/:id', checkIPRange, checklistController.getOneChecklist)

module.exports = router
