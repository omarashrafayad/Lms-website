import express from 'express';
import {
    changeUserPassword,
    createUser,
    deleteLoggedUserData,
    deleteUser,
    getAllUers,
    getLoggedUserData,
    getUser,
    resizeUserImage,
    updateLoggedUserData,
    updateLoggedUserPassword,
    updateUser,
    uploadUserImage,
} from '../controller/userController';

import {
    createUserValidator,
    deleteUserValidator,
    getUserValidator,
    updateUserValidator,
    changeUserPasswordValidator,
    updateLoggedUserValidator,
} from '../utils/validator/userValidator';

import { protect } from '../controller/authController';
import { checkEmailExists, checkCurrentPassword } from '../middlewares/validatorUserMiddleware';

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

const router = express.Router();

/**
 * @swagger
 * /api/v1/users/getMe:
 *   get:
 *     summary: Get currently logged in user details
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details
 */
router.get('/getMe', protect, getLoggedUserData, getUser);

/**
 * @swagger
 * /api/v1/users/updateMe:
 *   patch:
 *     summary: Update currently logged in user info
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User updated
 */
router.patch(
    '/updateMe',
    protect,
    uploadUserImage,
    resizeUserImage,
    updateLoggedUserValidator,
    checkEmailExists,
    updateLoggedUserData
);

/**
 * @swagger
 * /api/v1/users/changeMyPassword:
 *   patch:
 *     summary: Change currently logged in user password
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Password changed
 */
router.patch(
    '/changeMyPassword',
    protect,
    changeUserPasswordValidator,
    checkCurrentPassword,
    updateLoggedUserPassword
);

/**
 * @swagger
 * /api/v1/users/deleteMe:
 *   delete:
 *     summary: Deactivate currently logged in user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: User deleted
 */
router.delete('/deleteMe', protect, deleteLoggedUserData);

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users (Admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *   post:
 *     summary: Create a new user (Admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: User created
 */
router
    .route('/')
    .get(getAllUers)
    .post(
        uploadUserImage,
        resizeUserImage,
        createUserValidator,
        checkEmailExists,
        createUser
    );

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get user by ID (Admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 *   patch:
 *     summary: Update user (Admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User updated
 *   delete:
 *     summary: Delete user (Admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: User deleted
 */
router
    .route('/:id')
    .get(getUserValidator, getUser)
    .patch(updateUserValidator, checkEmailExists, updateUser)
    .delete(deleteUserValidator, deleteUser);

/**
 * @swagger
 * /api/v1/users/changePassword/{id}:
 *   patch:
 *     summary: Change user password (Admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Password changed
 */
router.patch(
    '/changePassword/:id',
    changeUserPasswordValidator,
    checkCurrentPassword,
    changeUserPassword
);

export default router;
