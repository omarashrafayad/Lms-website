import express from 'express';
import { createLesson, deleteLesson, getAllLessons, getLesson, updateLesson } from '../controller/lessonController';
import { protect, allowedTo } from '../controller/authController';

/**
 * @swagger
 * tags:
 *   name: Lessons
 *   description: Course lessons (Curriculum)
 */

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * /api/v1/lessons:
 *   get:
 *     summary: Get all lessons
 *     tags: [Lessons]
 *     responses:
 *       200:
 *         description: List of lessons
 *   post:
 *     summary: Create a new lesson (Instructor/Admin)
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Lesson created
 */
router.route('/')
    .get(getAllLessons)
    .post(protect, allowedTo('instructor', 'admin'), createLesson);

/**
 * @swagger
 * /api/v1/lessons/{id}:
 *   get:
 *     summary: Get lesson by ID
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lesson details
 *   patch:
 *     summary: Update lesson (Instructor/Admin)
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lesson updated
 *   delete:
 *     summary: Delete lesson (Instructor/Admin)
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Lesson deleted
 */
router.route('/:id')
    .get(getLesson)
    .patch(protect, allowedTo('instructor', 'admin'), updateLesson)
    .delete(protect, allowedTo('instructor', 'admin'), deleteLesson);

export default router;
