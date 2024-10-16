const actionController = require('../controllers/actionController')

const router = require('express').Router()

// Middleware
const verifyHMAC = require('../middlewares/verifyHMAC')

router.get('/', verifyHMAC, actionController.getActionsBySite)
router.get('/by-id/:id', verifyHMAC, actionController.getActionById)
router.get('/by-user', verifyHMAC, actionController.getActionByUserAndSite)
router.post('/', verifyHMAC, actionController.addAction)
router.patch('/:id', verifyHMAC, actionController.updateAction)
router.delete('/:id', verifyHMAC, actionController.deleteAction)
router.patch('/:id/read', verifyHMAC, actionController.readAction)
router.patch('/:id/complete', verifyHMAC, actionController.completeAction)

module.exports = router
