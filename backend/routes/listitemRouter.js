const listItemController = require('../controllers/listitemController')

const router = require('express').Router()

// Middleware
const requireAuth = require('../middlewares/requireAuth')
const checkIPRange = require('../middlewares/checkIPRange')

/**
 * @swagger
 * /api/list-items:
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
router.post('/', requireAuth, listItemController.addListItem)
/**
 * @swagger
 * /api/list-items/{id}:
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
router.get('/:id', requireAuth, listItemController.getOneListItem)
/**
 * @swagger
 * /api/list-items/{id}:
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
router.patch(
  '/:id',

  requireAuth,
  listItemController.updateListItem,
)
/**
 * @swagger
 * /api/list-items/{id}:
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
router.delete(
  '/:id',

  requireAuth,
  listItemController.deleteListItem,
)

/**
 * @swagger
 * /api/list-items/by-template/{id}:
 *   get:
 *     summary: Get List Items by Template ID
 *     description: Retrieve all list items associated with a specific template using the template ID.
 *     tags: [List Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the template to fetch list items for.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved list items associated with the specified template.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   list_item_id:
 *                     type: integer
 *                   item_name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   sites:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         site_name:
 *                           type: string
 *       400:
 *         description: Bad request, possibly due to missing or invalid template ID.
 *       500:
 *         description: Internal server error.
 */
router.get(
  '/by-template/:id',

  requireAuth,
  listItemController.getListItemsByTemplateId,
)

module.exports = router
