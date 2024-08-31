const listItemController = require('../controllers/listitemController')

const router = require('express').Router()

// Middleware
const requireAuth = require('../middlewares/requireAuth')
const checkIPRange = require('../middlewares/checkIPRange')

/**
 * @swagger
 * /api/listitems:
 *   post:
 *     summary: Add a new list item
 *     description: Create a new list item and associate it with specified sites.
 *     tags: [ListItems]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - template_id
 *               - keyword
 *               - description
 *               - sites
 *             properties:
 *               template_id:
 *                 type: integer
 *               is_environment_related:
 *                 type: boolean
 *               keyword:
 *                 type: string
 *               description:
 *                 type: string
 *               sites:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   description: IDs of associated sites.
 *     responses:
 *       201:
 *         description: List item created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ListItem'
 *       500:
 *         description: Internal server error.
 */
router.post('/', checkIPRange, listItemController.addListItem)
/**
 * @swagger
 * /api/listitems/{id}:
 *   get:
 *     summary: Get a list item by ID
 *     description: Retrieve a specific list item by its ID, including associated sites.
 *     tags: [ListItems]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the list item to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list item object with associated sites.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ListItem'
 *       404:
 *         description: List item not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:id', checkIPRange, listItemController.getOneListItem)
/**
 * @swagger
 * /api/listitems/{id}:
 *   patch:
 *     summary: Update a list item
 *     description: Update an existing list item by its ID and manage its associated sites.
 *     tags: [ListItems]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the list item to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               template_id:
 *                 type: integer
 *               is_environment_related:
 *                 type: boolean
 *               keyword:
 *                 type: string
 *               description:
 *                 type: string
 *               sites:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   description: IDs of associated sites.
 *     responses:
 *       200:
 *         description: List item updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ListItem'
 *       404:
 *         description: List item not found.
 *       500:
 *         description: Internal server error.
 */
router.patch('/:id', checkIPRange, listItemController.updateListItem)
/**
 * @swagger
 * /api/listitems/{id}:
 *   delete:
 *     summary: Delete a list item
 *     description: Delete a specific list item by its ID.
 *     tags: [ListItems]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the list item to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: List item deleted successfully.
 *       404:
 *         description: List item not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:id', checkIPRange, listItemController.deleteListItem)

module.exports = router
