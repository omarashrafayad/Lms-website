import express from 'express';
import { createExam, deleteExam, getAllExams, getExam, updateExam } from '../controller/examController';
import { protect, allowedTo } from '../controller/authController';

/**
 * @swagger
 * tags:
 *   name: Exams
 *   description: Course exams management
 */

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * /api/v1/exams:
 *   get:
 *     summary: Get all exams
 *     tags: [Exams]
 *     responses:
 *       200:
 *         description: List of exams
 *   post:
 *     summary: Create a new exam (Instructor/Admin)
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Exam created
 */
router.route('/')
    .get(getAllExams)
    .post(protect, allowedTo('instructor', 'admin'), createExam);

/**
 * @swagger
 * /api/v1/exams/{id}:
 *   get:
 *     summary: Get exam by ID
 *     tags: [Exams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Exam details
 *   patch:
 *     summary: Update exam (Instructor/Admin)
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Exam updated
 *   delete:
 *     summary: Delete exam (Instructor/Admin)
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Exam deleted
 */
router.route('/:id')
    .get(getExam)
    .patch(protect, allowedTo('instructor', 'admin'), updateExam)
    .delete(protect, allowedTo('instructor', 'admin'), deleteExam);

export default router;
