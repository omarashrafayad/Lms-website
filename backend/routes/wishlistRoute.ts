import express from 'express'
import { protect } from '../controller/authController';
import { addCourseToWishlist, getLoggedUserWishlist, removeCourseFromWishlist } from '../controller/wishlistController';

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: User wishlist management
 */

const router = express.Router();

/**
 * @swagger
 * /api/v1/wishlist:
 *   get:
 *     summary: Get logged in user wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User wishlist
 *   post:
 *     summary: Add course to wishlist
 *     tags: [Wishlist]
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
 *       200:
 *         description: Course added to wishlist
 */
router.route('/').post(protect, addCourseToWishlist).get(protect, getLoggedUserWishlist);

/**
 * @swagger
 * /api/v1/wishlist/{courseId}:
 *   delete:
 *     summary: Remove course from wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course removed
 */
router.delete('/:courseId', protect, removeCourseFromWishlist);

export default router;