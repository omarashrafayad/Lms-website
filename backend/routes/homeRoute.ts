import express from 'express';
import { getHomeData } from '../controller/homeController';

/**
 * @swagger
 * tags:
 *   name: Home
 *   description: Home page data
 */

const router = express.Router();

/**
 * @swagger
 * /api/v1/home:
 *   get:
 *     summary: Get home page summary data (Categories, New Courses, Trending)
 *     tags: [Home]
 *     responses:
 *       200:
 *         description: Home page data
 */
router.route('/').get(getHomeData)


export default router;
