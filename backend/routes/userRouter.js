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
router.post(
  '/add-new-user',
  // checkRole,

  // requireAuth,
  userController.addUser,
)
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
router.post('/login', userController.loginUser)
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
router.post('/logout', userController.logoutUser)
/**
 * @swagger
 * /api/users/change-password:
 *   patch:
 *     summary: Change password
 *     description: Change the password for an existing user.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
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
router.patch('/change-password', userController.changePassword)
/**
 * @swagger
 * /api/users/delete-user:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user account by username.
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
 *                 example: "john_doe"
 *                 description: "The username of the user to delete."
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       400:
 *         description: Username is required.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.delete(
  '/:id',
  checkRole,
  requireAuth,

  userController.deleteUser,
)
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users in the system.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user_id:
 *                     type: integer
 *                     example: 1
 *                   username:
 *                     type: string
 *                     example: "john_doe"
 *                   role:
 *                     type: string
 *                     example: "admin"
 *       500:
 *         description: Internal server error.
 */
router.get(
  '/',
  checkRole,
  requireAuth,

  userController.getAllUsers,
)
/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Update user role
 *     description: Update the role of a user by their ID.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user whose role is to be updated.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User role updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User updated successfully"
 *       400:
 *         description: Username is required.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Username is required"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 *                 details:
 *                   type: string
 *                   example: "Error message details"
 */
router.patch(
  '/:id',
  checkRole,
  requireAuth,

  userController.updateUserRole,
)

/**
 * @swagger
 * /api/users/reset-password:
 *   patch:
 *     summary: Reset user password
 *     description: Resets the password of a user to a default value ('00000000').
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
 *               user_id:
 *                 type: interger
 *                 example: "2222"
 *                 description: The user id of the user whose password is being reset.
 *     responses:
 *       200:
 *         description: Password reset successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password reset successfully"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.patch(
  '/reset-password/:id',

  requireAuth,
  checkRole,
  userController.resetPassword,
)

module.exports = router
