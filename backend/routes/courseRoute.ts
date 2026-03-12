import express from 'express';
import { createCourse, deleteCourse, getAllCourses, getCourse, resizeCourseImages, updateCourse, uploadCourseImages } from '../controller/courseController';
import { createCourseValidator, deleteCourseValidator, getCourseValidator, updateCourseValidator } from '../utils/validator/courseValidator';
import reviewRoute from '../routes/reviewRoute'
import { validateCourseLogic, validateUpdateCourseLogic } from '../middlewares/validateCourseLogic';

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Course management
 */

const router = express.Router();

router.use('/:courseId/reviews', reviewRoute);

/**
 * @swagger
 * /api/v1/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of courses
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Course created
 */
router.route('/').get(getAllCourses).post(uploadCourseImages, resizeCourseImages, createCourseValidator, validateCourseLogic, createCourse);

/**
 * @swagger
 * /api/v1/courses/{id}:
 *   get:
 *     summary: Get course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course details
 *   patch:
 *     summary: Update course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Course updated
 *   delete:
 *     summary: Delete course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Course deleted
 */
router.route('/:id').get(getCourseValidator, getCourse)
    .patch(uploadCourseImages, resizeCourseImages, updateCourseValidator, validateUpdateCourseLogic, updateCourse)
    .delete(deleteCourseValidator, deleteCourse)

export default router;