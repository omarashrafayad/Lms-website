import asyncHandler from 'express-async-handler';
import Review from '../model/reviewModel';
import Course from '../model/courseModel';
import ApiError from '../utils/apiError';

export const checkReviewExists = asyncHandler(async (req, res, next) => {
    if (!req.user?._id) {
        return next(new ApiError("User not authenticated", 401));
    }
    const courseId = req.body.course;

    const course = await Course.findById(courseId);
    if (!course) {
        return next(new ApiError('There is no course with this id', 404));
    }
    const review = await Review.findOne({
        user: req.user._id,
        course: req.body.course,
    });

    if (review) {
        return next(new ApiError('You already created a review before', 400));
    }
    next();
});

export const checkReviewOwnership = asyncHandler(async (req, res, next) => {
    if (!req.user?._id) {
        return next(new ApiError("User not authenticated", 401));
    }
    const review = await Review.findById(req.params.id);
    if (!review) return next(new ApiError('There is no review with this id', 404));

    if (review.user.toString() !== req.user._id.toString()) {
        return next(new ApiError('You are not allowed to perform this action', 403));
    }

    next();
});

export const checkReviewDeletePermission = asyncHandler(async (req, res, next) => {
    if (!req.user?._id) {
        return next(new ApiError("User not authenticated", 401));
    }
    const review = await Review.findById(req.params.id);
    if (!review) return next(new ApiError('There is no review with this id', 404));

    if (req.user.role === 'student' && review.user.toString() !== req.user._id.toString()) {
        return next(new ApiError('You are not allowed to perform this action', 403));
    }

    next();
});
