const userController = require('../controllers/Auth/userController')

const router = require('express').Router()

const requireAuth = require('../middlewares/requireAuth')
const checkRole = require('../middlewares/checkRole')
const checkIPRange = require('../middlewares/checkIPRange')

/**
 * @swagger
 * /api/users/add-new-user:
 *   post:
 *     summary: Add new user
 *     description: Add a new user account.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for the new account.
 *               password:
 *                 type: string
 *                 description: The password for the new account.
 *               role:
 *                 type: string
 *                 description: The role assigned to the user.
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Username and password are required, User already exists, or Password is not strong enough.
 *       500:
 *         description: Internal server error.
 */
router.post('/add-new-user', checkIPRange, userController.addUser)
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login
 *     description: Authenticate a user and return a token.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the account.
 *               password:
 *                 type: string
 *                 description: The password of the account.
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token for the authenticated user.
 *       400:
 *         description: Username and password are required.
 *       401:
 *         description: Invalid password.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.post('/login', checkIPRange, userController.loginUser)
/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: Logout
 *     description: Logout a user and blacklist the token.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully.
 *       400:
 *         description: Error occurred during logout.
 *       500:
 *         description: Internal server error.
 */
router.post('/logout', checkIPRange, userController.logoutUser)
/**
 * @swagger
 * /api/users/{id}/change-password:
 *   patch:
 *     summary: Change password
 *     description: Change the password for an existing user.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the account.
 *               password:
 *                 type: string
 *                 description: The current password of the account.
 *               newPassword:
 *                 type: string
 *                 description: The new password for the account.
 *     responses:
 *       200:
 *         description: Password changed successfully.
 *       400:
 *         description: Error occurred during password change.
 *       401:
 *         description: Invalid password.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.patch(
  '/:id/change-password',
  checkIPRange,
  userController.changePassword,
)

module.exports = router
