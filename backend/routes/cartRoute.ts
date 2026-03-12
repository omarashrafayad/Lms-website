import express from 'express';
import { protect } from "../controller/authController";
import { addCourseToCart, clearCart, getLoggedUserCart, applyCoupon, removeSpecificCartItem } from "../controller/cartController";

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Shopping cart management
 */

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * /api/v1/cart:
 *   get:
 *     summary: Get logged in user cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User cart
 *   post:
 *     summary: Add course to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Course added to cart
 *   delete:
 *     summary: Clear cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Cart cleared
 */
router
    .route('/')
    .post(addCourseToCart)
    .get(getLoggedUserCart)
    .delete(clearCart);

/**
 * @swagger
 * /api/v1/cart/applyCoupon:
 *   patch:
 *     summary: Apply coupon to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               coupon:
 *                 type: string
 *     responses:
 *       200:
 *         description: Coupon applied
 */
router.patch('/applyCoupon', applyCoupon);

/**
 * @swagger
 * /api/v1/cart/{itemId}:
 *   delete:
 *     summary: Remove specific item from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item removed
 */
router
    .route('/:itemId')
    .delete(removeSpecificCartItem);

export default router;