const siteController = require('../controllers/siteController')

const router = require('express').Router()

// Middleware
const requireAuth = require('../middlewares/requireAuth')
const checkRole = require('../middlewares/checkRole')
const checkIPRange = require('../middlewares/checkIPRange')

/**
 * @swagger
 * /api/sites:
 *   post:
 *     summary: Add a new site
 *     description: Create a new site.
 *     tags: [Sites]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Site'
 *     responses:
 *       201:
 *         description: Site created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Site'
 *       500:
 *         description: Internal server error.
 */
router.post('/', checkIPRange, requireAuth, checkRole, siteController.addSite)
/**
 * @swagger
 * /api/sites:
 *   get:
 *     summary: Get all sites
 *     description: Retrieve a list of all sites.
 *     tags: [Sites]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of sites.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Site'
 *       500:
 *         description: Internal server error.
 */
router.get('/', checkIPRange, requireAuth, siteController.getAllSites)
/**
 * @swagger
 * /api/sites/{id}:
 *   get:
 *     summary: Get a site by ID
 *     description: Retrieve a specific site by its ID.
 *     tags: [Sites]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the site to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A site object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Site'
 *       404:
 *         description: Site not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:id', checkIPRange, requireAuth, siteController.getOneSite)
/**
 * @swagger
 * /api/sites/{id}:
 *   patch:
 *     summary: Update a site
 *     description: Update an existing site by its ID.
 *     tags: [Sites]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the site to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Site'
 *     responses:
 *       200:
 *         description: Site updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Site'
 *       404:
 *         description: Site not found.
 *       500:
 *         description: Internal server error.
 */
router.patch(
  '/:id',
  checkIPRange,
  requireAuth,
  checkRole,
  siteController.updateSite,
)
/**
 * @swagger
 * /api/sites/{id}:
 *   delete:
 *     summary: Delete a site
 *     description: Delete a site by its ID.
 *     tags: [Sites]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the site to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Site deleted successfully.
 *       404:
 *         description: Site not found.
 *       500:
 *         description: Internal server error.
 */
router.delete(
  '/:id',
  checkIPRange,
  requireAuth,
  checkRole,
  siteController.deleteSite,
)

module.exports = router
