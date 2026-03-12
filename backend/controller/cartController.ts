import { ICart } from './../model/cartModel';
import asyncHandler from 'express-async-handler';
import Course from '../model/courseModel';
import Cart from '../model/cartModel';
import Coupon from '../model/couponModel';
import ApiError from '../utils/apiError';

// Calculate total cart price
const calcTotalCartPrice = (cart: ICart) => {
    let totalPrice = 0;
    cart.cartItems.forEach((item) => {
        totalPrice += item.price;
    });
    cart.totalCartPrice = totalPrice;
    cart.totalPriceAfterDiscount = undefined;
    return totalPrice;
};

// Add course to cart
export const addCourseToCart = asyncHandler(async (req, res, next) => {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
        return next(new ApiError('Course not found', 404));
    }

    let cart = await Cart.findOne({ user: req.user?._id });

    if (!cart) {
        cart = await Cart.create({
            user: req.user?._id,
            cartItems: [],
            totalCartPrice: 0,
        });
    }

    const courseIndex = cart.cartItems.findIndex(
        (item) => item.course.toString() === courseId
    );

    if (courseIndex > -1) {
        return next(new ApiError('Course already in cart', 400));
    } else {
        cart.cartItems.push({ course: courseId, price: course.price });
    }

    calcTotalCartPrice(cart);
    await cart.save();

    res.status(200).json({
        status: 'success',
        message: 'Course added to cart successfully',
        numOfCartItems: cart.cartItems.length,
        data: cart,
    });
});

// Get logged user cart
export const getLoggedUserCart = asyncHandler(async (req, res, next) => {
    if (!req.user?._id) {
        return next(new ApiError("User not authenticated", 401));
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
        cart = await Cart.create({
            user: req.user._id,
            cartItems: [],
            totalCartPrice: 0,
        });
    }

    res.status(200).json({
        status: 'success',
        numOfCartItems: cart.cartItems.length,
        data: cart,
    });
});

// Remove specific cart item
export const removeSpecificCartItem = asyncHandler(async (req, res, next) => {
    if (!req.user?._id) {
        return next(new ApiError("User not authenticated", 401));
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
        cart = await Cart.create({
            user: req.user._id,
            cartItems: [],
            totalCartPrice: 0,
        });
    } else {
        cart.cartItems = cart.cartItems.filter(
            (item) => item._id?.toString() !== req.params.itemId
        );
        calcTotalCartPrice(cart);
        await cart.save();
    }

    res.status(200).json({
        status: 'success',
        numOfCartItems: cart.cartItems.length,
        data: cart,
    });
});

// Clear cart
export const clearCart = asyncHandler(async (req, res, next) => {
    if (!req.user?._id) {
        return next(new ApiError("User not authenticated", 401));
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
        cart = await Cart.create({
            user: req.user._id,
            cartItems: [],
            totalCartPrice: 0,
        });
    } else {
        cart.cartItems = [];
        cart.totalCartPrice = 0;
        cart.totalPriceAfterDiscount = undefined;
        await cart.save();
    }

    res.status(200).json({
        status: 'success',
        numOfCartItems: cart.cartItems.length,
        data: cart,
    });
});

// Apply coupon
export const applyCoupon = asyncHandler(async (req, res, next) => {
    const coupon = await Coupon.findOne({
        name: req.body.coupon,
        expire: { $gt: Date.now() },
    });

    if (!coupon) {
        return next(new ApiError(`Coupon is invalid or expired`, 400));
    }

    let cart = await Cart.findOne({ user: req.user?._id });
    if (!cart) {
        cart = await Cart.create({
            user: req.user?._id,
            cartItems: [],
            totalCartPrice: 0,
        });
    }

    const totalPrice = cart.totalCartPrice;
    const totalPriceAfterDiscount = (totalPrice - (totalPrice * coupon.discount) / 100).toFixed(2);

    cart.totalPriceAfterDiscount = totalPriceAfterDiscount;
    await cart.save();

    res.status(200).json({
        status: 'success',
        numOfCartItems: cart.cartItems.length,
        data: cart,
    });
});