const siteController = require('../controllers/siteController')

const router = require('express').Router()

// Middleware
const requireAuth = require('../middlewares/requireAuth')
const checkRole = require('../middlewares/checkRole')
const checkIPRange = require('../middlewares/checkIPRange')

router.post('/', checkIPRange, siteController.addSite)
router.get('/', checkIPRange, siteController.getAllSites)
router.get('/:id', checkIPRange, siteController.getOneSite)
router.patch('/:id', checkIPRange, siteController.updateSite)
router.delete('/:id', checkIPRange, siteController.deleteSite)

module.exports = router
