const ipAddressController = require('../controllers/Auth/ipAddressController')

const router = require('express').Router()

const requireAuth = require('../middlewares/requireAuth')
const checkRole = require('../middlewares/checkRole')
const checkIPRange = require('../middlewares/checkIPRange')
/**
 * @swagger
 * /api/ip-addresses:
 *   post:
 *     summary: Add a new IP Address
 *     description: Adds a new IP Address to the database.
 *     tags: [IPAddresses]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ip_address:
 *                 type: string
 *                 description: The IP address to add.
 *                 example: "192.168.1.1"
 *     responses:
 *       201:
 *         description: IP Address created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IPAddress'
 *       400:
 *         description: IP Address is required.
 *       500:
 *         description: Internal server error.
 */
router.post(
  '/',

  requireAuth,
  checkRole,
  ipAddressController.addIPAddress,
)
/**
 * @swagger
 * /api/ip-addresses:
 *   get:
 *     summary: Get all IP Addresses
 *     description: Retrieves a list of all IP Addresses.
 *     tags: [IPAddresses]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of IP Addresses.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/IPAddress'
 *       500:
 *         description: Internal server error.
 */
router.get(
  '/',

  requireAuth,
  checkRole,
  ipAddressController.getIPAddresses,
)
/**
 * @swagger
 * /api/ip-addresses/{id}:
 *   get:
 *     summary: Get an IP Address by ID
 *     description: Retrieves a specific IP Address by its ID.
 *     tags: [IPAddresses]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the IP Address.
 *     responses:
 *       200:
 *         description: The IP Address details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IPAddress'
 *       404:
 *         description: IP Address not found.
 *       500:
 *         description: Internal server error.
 */
router.get(
  '/:id',

  requireAuth,
  checkRole,
  ipAddressController.getIPAddressById,
)
/**
 * @swagger
 * /api/ip-addresses/{id}:
 *   patch:
 *     summary: Update an IP Address
 *     description: Updates the details of a specific IP Address.
 *     tags: [IPAddresses]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the IP Address to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ip_address:
 *                 type: string
 *                 description: The new IP address.
 *                 example: "192.168.1.100"
 *     responses:
 *       200:
 *         description: IP Address updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IPAddress'
 *       404:
 *         description: IP Address not found.
 *       500:
 *         description: Internal server error.
 */
router.patch(
  '/:id',

  requireAuth,
  checkRole,
  ipAddressController.updateIPAddress,
)
/**
 * @swagger
 * /api/ip-addresses/{id}:
 *   delete:
 *     summary: Delete an IP Address
 *     description: Deletes a specific IP Address by its ID.
 *     tags: [IPAddresses]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the IP Address to delete.
 *     responses:
 *       204:
 *         description: IP Address deleted successfully.
 *       404:
 *         description: IP Address not found.
 *       500:
 *         description: Internal server error.
 */
router.delete(
  '/:id',

  requireAuth,
  checkRole,
  ipAddressController.deleteIPAddress,
)

module.exports = router
