import { deleteReviewValidator, getReviewValidator, updateReviewValidator } from './../utils/validator/reviewValidator';
import express from 'express';
import { getReviews, createFilterObj, setCourseIdAndUserIdToBody, createReview, getReview, updateReview, deleteReview } from '../controller/reviewController';
import { createReviewValidator } from '../utils/validator/reviewValidator';
import { protect } from '../controller/authController';
import { checkReviewDeletePermission, checkReviewExists, checkReviewOwnership } from '../middlewares/validateReviewMiddleware';

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Course reviews management
 */

const router = express.Router({ mergeParams: true })

/**
 * @swagger
 * /api/v1/reviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: List of reviews
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ratings
 *               - course
 *             properties:
 *               title:
 *                 type: string
 *               ratings:
 *                 type: number
 *               course:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review created
 */
router.route('/').get(createFilterObj, getReviews)
    .post(protect, setCourseIdAndUserIdToBody, createReviewValidator, checkReviewExists, createReview)

/**
 * @swagger
 * /api/v1/reviews/{id}:
 *   get:
 *     summary: Get review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review details
 *   patch:
 *     summary: Update review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Review updated
 *   delete:
 *     summary: Delete review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Review deleted
 */
router.route('/:id').get(getReviewValidator, getReview)
    .patch(protect, updateReviewValidator, checkReviewOwnership, updateReview)
    .delete(protect, deleteReviewValidator, checkReviewDeletePermission, deleteReview)

export default router;