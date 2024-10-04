const checklistController = require('../controllers/checklistController')

const router = require('express').Router()

// Middleware

const checkIPRange = require('../middlewares/checkIPRange')
/**
 * @swagger
 * /api/checklists/create/{id}:
 *   post:
 *     summary: Initialize checklist for a site
 *     description: Initializes checklists for a specific site based on templates, categories, and list items. If a checklist already exists, it updates the checklist with any new list items.
 *     tags: [Checklists]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the site for which the checklist is being initialized.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Checklists initialized successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Checklist'
 *       500:
 *         description: Internal server error.
 */
router.post(
  '/create/:id',

  checklistController.initializeChecklist,
)
/**
 * @swagger
 * /api/checklists/all/{id}:
 *   get:
 *     summary: Get all checklists for a site
 *     description: Retrieves all checklists for a specific site, including associated user checks and comments, ordered by creation date.
 *     tags: [Checklists]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the site for which the checklists are being retrieved.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of checklists.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Checklist'
 *       400:
 *         description: Site ID is required.
 *       500:
 *         description: Internal server error.
 */
router.get('/', checklistController.getAllChecklistsByUserAndSite)
/**
 * @swagger
 * /api/checklists/{id}:
 *   get:
 *     summary: Get a checklist by ID
 *     description: Retrieves a specific checklist by its ID, including associated user checks and comments.
 *     tags: [Checklists]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the checklist to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A checklist object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Checklist'
 *       404:
 *         description: Checklist not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:id', checklistController.getOneChecklist)

module.exports = router
