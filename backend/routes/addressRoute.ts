import express from 'express'
import { addAddress, getLoggedUserAddresses, removeAddress } from '../controller/addressController';

import { protect } from '../controller/authController';
import { addAddressValidator } from '../utils/validator/addressValidator';

/**
 * @swagger
 * tags:
 *   name: Addresses
 *   description: User address management
 */

const router = express.Router();

/**
 * @swagger
 * /api/v1/addresses:
 *   get:
 *     summary: Get all addresses for logged in user
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of addresses
 *   post:
 *     summary: Add a new address
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Address added
 */
router.route('/').post(protect, addAddressValidator, addAddress).get(protect, getLoggedUserAddresses);

/**
 * @swagger
 * /api/v1/addresses/{addressId}:
 *   delete:
 *     summary: Remove an address
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: addressId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Address removed
 */
router.delete('/:addressId', protect, removeAddress);

export default router;