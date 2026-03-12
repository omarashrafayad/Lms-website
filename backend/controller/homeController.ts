import asyncHandler from 'express-async-handler';
import CategoryModel from "../model/categoryModel";
import courseModel from "../model/courseModel";

export const getHomeData = asyncHandler(async (req, res) => {

    const shopByCategory = await CategoryModel.find().limit(3);

    const newCourses = await courseModel
        .find()
        .sort("-createdAt")
        .limit(3);

    const trendingCourses = await courseModel
        .find()
        .sort("-ratingsAverage")
        .limit(4);

    res.status(200).json({
        shopByCategory,
        newCourses,
        trendingCourses,
    });
});
