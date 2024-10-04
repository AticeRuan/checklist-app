const actionController = require('../controllers/actionController')

const router = require('express').Router()
router.get('/', actionController.getActions)
router.get('/:id', actionController.getActionById)
router.post('/', actionController.addAction)
router.patch('/:id', actionController.updateAction)
router.delete('/:id', actionController.deleteAction)
router.patch('/:id/read', actionController.readAction)
router.patch('/:id/complete', actionController.completeAction)

module.exports = router
