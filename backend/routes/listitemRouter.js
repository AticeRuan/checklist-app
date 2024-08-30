const listItemController = require('../controllers/listitemController')

const router = require('express').Router()

// Middleware
const requireAuth = require('../middlewares/requireAuth')
const checkIPRange = require('../middlewares/checkIPRange')

router.post('/', checkIPRange, listItemController.addListItem)
router.get('/:id', checkIPRange, listItemController.getOneListItem)
router.patch('/:id', checkIPRange, listItemController.updateListItem)
router.delete('/:id', checkIPRange, listItemController.deleteListItem)

module.exports = router
