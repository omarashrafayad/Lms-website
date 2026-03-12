import asyncHandler from 'express-async-handler';
import User from '../model/userModel'
import ApiError from '../utils/apiError';

export const addCourseToWishlist = asyncHandler(async (req, res, next) => {
    if (!req.user?._id) {
        return next(new ApiError("User not authenticated", 401));
    }
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $addToSet: { wishlist: req.body.courseId },
        },
        { new: true }
    );

    res.status(200).json({
        status: 'success',
        message: 'Course added successfully to your wishlist.',
        data: user?.wishlist,
    });
});


export const removeCourseFromWishlist = asyncHandler(async (req, res, next) => {
    if (!req.user?._id) {
        return next(new ApiError("User not authenticated", 401));
    }
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $pull: { wishlist: req.params.courseId },
        },
        { new: true }
    );

    res.status(200).json({
        status: 'success',
        message: 'Course removed successfully from your wishlist.',
        data: user?.wishlist,
    });
});

export const getLoggedUserWishlist = asyncHandler(async (req, res, next) => {
    if (!req.user?._id) {
        return next(new ApiError("User not authenticated", 401));
    }
    const user = await User.findById(req.user._id).populate({
        path: 'wishlist',
        select: '_id title price imageCover'
    });

    res.status(200).json({
        status: 'success',
        results: user?.wishlist.length,
        data: user?.wishlist,
    });
});