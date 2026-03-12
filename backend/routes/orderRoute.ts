import express from 'express';
import { protect } from '../controller/authController';
import { createCashOrder, deleteOrder, filterOrderForLoggedUser, findAllOrders, findSpecificOrder, updateOrderToPaid } from '../controller/orderController';

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 */

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * /api/v1/order/{cartId}:
 *   post:
 *     summary: Create a cash order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Order created
 */
router.route('/:cartId').post(createCashOrder);

/**
 * @swagger
 * /api/v1/order:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders
 */
router.get('/', filterOrderForLoggedUser, findAllOrders);

/**
 * @swagger
 * /api/v1/order/{id}:
 *   get:
 *     summary: Get specific order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 *   delete:
 *     summary: Delete an order (Admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Order deleted
 */
router.get('/:id', findSpecificOrder);
router.delete('/:id', deleteOrder);

/**
 * @swagger
 * /api/v1/order/{id}/pay:
 *   patch:
 *     summary: Mark order as paid (Admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order marked as paid
 */
router.patch('/:id/pay', updateOrderToPaid);

export default router;