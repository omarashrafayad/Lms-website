import express from 'express';
import { createBlog, deleteBlog, getAllBlogs, getBlog, resizeBlogImage, updateBlog, uploadBlogImage } from '../controller/blogController';
import { protect, allowedTo } from '../controller/authController';

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Blog management
 */

const router = express.Router();

/**
 * @swagger
 * /api/v1/blogs:
 *   get:
 *     summary: Get all blog posts
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: List of blog posts
 *   post:
 *     summary: Create a new blog post (Instructor/Admin)
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Blog post created
 */
router.route('/')
    .get(getAllBlogs)
    .post(protect, allowedTo('instructor', 'admin'), uploadBlogImage, resizeBlogImage, createBlog);

/**
 * @swagger
 * /api/v1/blogs/{id}:
 *   get:
 *     summary: Get blog post by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog post details
 *   patch:
 *     summary: Update blog post (Instructor/Admin)
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Blog post updated
 *   delete:
 *     summary: Delete blog post (Instructor/Admin)
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Blog post deleted
 */
router.route('/:id')
    .get(getBlog)
    .patch(protect, allowedTo('instructor', 'admin'), uploadBlogImage, resizeBlogImage, updateBlog)
    .delete(protect, allowedTo('instructor', 'admin'), deleteBlog);

export default router;
