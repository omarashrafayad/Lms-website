import { forgotPasswordValidator, loginValidator, resetCodeValidator, resetPasswordValidator } from './../utils/validator/authValidator';
import express from 'express';
import { signUpValidator } from '../utils/validator/authValidator';
import { forgotPassword, login, resetPassword, signUp, verifyPassResetCode } from '../controller/authController';
import { checkEmailExists } from '../middlewares/validatorUserMiddleware';


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication management
 */

const router = express.Router();

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.route('/signup').post(signUpValidator, checkEmailExists, signUp)

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.route('/login').post(loginValidator, login)

/**
 * @swagger
 * /api/v1/auth/forgotPassword:
 *   post:
 *     summary: Request password reset
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 */
router.post('/forgotPassword', forgotPasswordValidator, forgotPassword);

/**
 * @swagger
 * /api/v1/auth/verifyResetCode:
 *   post:
 *     summary: Verify reset code
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - resetCode
 *             properties:
 *               resetCode:
 *                 type: string
 */
router.post('/verifyResetCode', resetCodeValidator, verifyPassResetCode);

/**
 * @swagger
 * /api/v1/auth/resetPassword:
 *   patch:
 *     summary: Reset password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *               newPassword:
 *                 type: string
 */
router.patch('/resetPassword', resetPasswordValidator, resetPassword);

export default router;
