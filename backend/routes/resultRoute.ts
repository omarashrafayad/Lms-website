import express from 'express';
import { getAllResults, getMyResults, submitExam } from '../controller/resultController';
import { protect, allowedTo } from '../controller/authController';

/**
 * @swagger
 * tags:
 *   name: Results
 *   description: Exam results management
 */

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * /api/v1/results/submit:
 *   post:
 *     summary: Submit an exam and get result
 *     tags: [Results]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - examId
 *               - answers
 *             properties:
 *               examId:
 *                 type: string
 *               answers:
 *                 type: array
 *                 items:
 *                   type: number
 *     responses:
 *       201:
 *         description: Result created
 */
router.post('/submit', submitExam);

/**
 * @swagger
 * /api/v1/results/my-results:
 *   get:
 *     summary: Get results for logged in user
 *     tags: [Results]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user results
 */
router.get('/my-results', getMyResults);

/**
 * @swagger
 * /api/v1/results:
 *   get:
 *     summary: Get all results (Admin/Instructor)
 *     tags: [Results]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all results
 */
router.get('/', allowedTo('admin', 'instructor'), getAllResults);

export default router;
