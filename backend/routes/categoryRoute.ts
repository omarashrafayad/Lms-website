import express from "express";
import { createCategoryValidator, deleteCategoryValidator, getCategoryValidator, updateCategoryValidator } from '../utils/validator/categoryValidator';
import { createCategory, deleteCtagory, getAllCategories, getCategory, resizeCategoryImage, updateCategory, uploadCategoryImage } from '../controller/categoryController'
import subcategoriesRoute from '../routes/subCategoryRoute'

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management
 */

const router = express.Router();

router.use('/:categoryId/subcategories', subcategoriesRoute)

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Category created
 */
router.route('/').get(getAllCategories).post(uploadCategoryImage, resizeCategoryImage, createCategoryValidator, createCategory);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category details
 *   patch:
 *     summary: Update category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category updated
 *   delete:
 *     summary: Delete category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Category deleted
 */
router.route('/:id').get(getCategoryValidator, getCategory)
    .patch(uploadCategoryImage, resizeCategoryImage, updateCategoryValidator, updateCategory)
    .delete(deleteCategoryValidator, deleteCtagory)

export default router;
