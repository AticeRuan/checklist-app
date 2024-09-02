const templateController = require('../controllers/templateController')

const router = require('express').Router()

// Middleware
const checkIPRange = require('../middlewares/checkIPRange')
const requireAuth = require('../middlewares/requireAuth')

/**
 * @swagger
 * /api/templates:
 *   post:
 *     summary: Add a new template
 *     description: Create a new template with default values.
 *     tags: [Templates]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Template created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Template'
 *       500:
 *         description: Internal server error.
 */
router.post('/', requireAuth, checkIPRange, templateController.addTemplate)
/**
 * @swagger
 * /api/templates:
 *   get:
 *     summary: Get templates by status
 *     description: Retrieve a list of templates filtered by their status.
 *     tags: [Templates]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: status
 *         in: path
 *         required: true
 *         description: The status of the templates (e.g., draft, published).
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of templates.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Template'
 *       400:
 *         description: Status is required.
 *       500:
 *         description: Internal server error.
 */
router.get('/', requireAuth, checkIPRange, templateController.getAllTemplates)
/**
 * @swagger
 * /api/templates/{id}:
 *   get:
 *     summary: Get a template by ID
 *     description: Retrieve a specific template by its ID.
 *     tags: [Templates]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the template to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A template object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Template'
 *       404:
 *         description: Template not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:id', requireAuth, checkIPRange, templateController.getOneTemplate)
/**
 * @swagger
 * /api/templates/{id}:
 *   patch:
 *     summary: Update a template
 *     description: Update an existing template by ID, including its associated sites.
 *     tags: [Templates]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the template to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category_id:
 *                 type: integer
 *               last_updated_by:
 *                 type: string
 *               sites:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Template updated successfully.
 *       404:
 *         description: Template not found.
 *       500:
 *         description: Internal server error.
 */
router.patch(
  '/:id',
  requireAuth,
  checkIPRange,
  templateController.updateTemplate,
)
/**
 * @swagger
 * /api/templates/{id}:
 *   delete:
 *     summary: Delete a template
 *     description: Delete an existing template by its ID.
 *     tags: [Templates]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the template to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Template deleted successfully.
 *       404:
 *         description: Template not found.
 *       500:
 *         description: Internal server error.
 */
router.delete(
  '/:id',
  requireAuth,
  checkIPRange,
  templateController.deleteTemplate,
)

module.exports = router
