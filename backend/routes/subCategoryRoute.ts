import express from 'express';
import { createFilterObj, createSubCategory, deleteSubCategory, getSubCategories, getSubCategory, setCategoryIdToBody, updateSubCategory } from '../controller/subCategoryController';
import { createSubCategoryValidator, deleteSubCategoryValidator, getSubCategoryValidator, updateSubCategoryValidator } from '../utils/validator/subCategoryValidator';
import { checkCategoryExists, checkSubCategoryUpdateCategory } from '../middlewares/validateSubCategory';

/**
 * @swagger
 * tags:
 *   name: SubCategories
 *   description: SubCategory management
 */

const router = express.Router({ mergeParams: true })

/**
 * @swagger
 * /api/v1/subcategories:
 *   get:
 *     summary: Get all subcategories
 *     tags: [SubCategories]
 *     responses:
 *       200:
 *         description: List of subcategories
 *   post:
 *     summary: Create a new subcategory
 *     tags: [SubCategories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: SubCategory created
 */
router.route('/').get(createFilterObj, getSubCategories)
    .post(setCategoryIdToBody, createSubCategoryValidator, checkCategoryExists, createSubCategory)

/**
 * @swagger
 * /api/v1/subcategories/{id}:
 *   get:
 *     summary: Get subcategory by ID
 *     tags: [SubCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: SubCategory details
 *   patch:
 *     summary: Update subcategory
 *     tags: [SubCategories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: SubCategory updated
 *   delete:
 *     summary: Delete subcategory
 *     tags: [SubCategories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: SubCategory deleted
 */
router.route('/:id').get(getSubCategoryValidator, getSubCategory)
    .patch(updateSubCategoryValidator, checkSubCategoryUpdateCategory, updateSubCategory)
    .delete(deleteSubCategoryValidator, deleteSubCategory)

export default router;
