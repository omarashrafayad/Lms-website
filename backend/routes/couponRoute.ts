import express from "express";
import { createCoupon, deleteCoupon, getAllCoupones, getCoupon, updateCoupon } from "../controller/couponController";
import { createCouponValidator, deleteCouponValidator, getCouponValidator, updateCouponValidator } from "../utils/validator/couponValidator";

/**
 * @swagger
 * tags:
 *   name: Coupons
 *   description: Coupon management (Admin)
 */

const router = express.Router();

/**
 * @swagger
 * /api/v1/coupon:
 *   get:
 *     summary: Get all coupons
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of coupons
 *   post:
 *     summary: Create a new coupon
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Coupon created
 */
router.route('/').get(getAllCoupones).post(createCouponValidator, createCoupon);

/**
 * @swagger
 * /api/v1/coupon/{id}:
 *   get:
 *     summary: Get coupon by ID
 *     tags: [Coupons]
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
 *         description: Coupon details
 *   patch:
 *     summary: Update coupon
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Coupon updated
 *   delete:
 *     summary: Delete coupon
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Coupon deleted
 */
router.route('/:id').get(getCouponValidator, getCoupon)
    .patch(updateCouponValidator, updateCoupon)
    .delete(deleteCouponValidator, deleteCoupon)

export default router;