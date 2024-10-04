const actionController = require('../controllers/actionController')

const router = require('express').Router()
router.get('/', actionController.getActions)
router.post('/add-action', actionController.addAction)
router.patch('/:id', actionController.updateAction)
router.delete('/:id', actionController.deleteAction)
router.patch('/:id/read', actionController.readAction)
router.patch('/:id/complete', actionController.completeAction)

module.exports = router
