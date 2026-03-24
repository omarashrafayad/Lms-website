import asyncHandler from 'express-async-handler';
import courseModel from "../model/courseModel";

export const getHomeData = asyncHandler(async (req, res) => {

    const newCourses = await courseModel
        .find()
        .sort("-createdAt")
        .limit(3);

    const trendingCourses = await courseModel
        .find()
        .sort("-ratingsAverage")
        .limit(4);

    res.status(200).json({
        newCourses,
        trendingCourses,
    });
});
