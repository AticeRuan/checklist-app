const commentController = require('../controllers/commentController')

const router = require('express').Router()

// Middleware
const checkIPRange = require('../middlewares/checkIPRange')
const verifyHMAC = require('../middlewares/verifyHMAC')

/**
 * @swagger
 * /api/comments/{id}:
 *   post:
 *     summary: Add a comment to a user check
 *     description: Create a new comment for a specific user check by its ID.
 *     tags: [Comments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user check to add the comment to.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "This is a comment."
 *                 description: The content of the comment.
 *     responses:
 *       201:
 *         description: Comment created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Comment cannot be empty.
 *       500:
 *         description: Internal server error.
 */
router.post('/', verifyHMAC, commentController.addComment)
module.exports = router
