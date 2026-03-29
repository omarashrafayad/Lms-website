import asyncHandler from 'express-async-handler';
import courseModel from "../model/courseModel";
import userModel from "../model/userModel";

export const getHomeData = asyncHandler(async (req, res) => {
    const newCourses = await courseModel
        .find()
        .sort("-createdAt")
        .limit(3);

    const trendingCourses = await courseModel
        .find()
        .sort("-ratingsAverage")
        .limit(4);

    const totalCourses = await courseModel.countDocuments();
    const totalStudents = await userModel.countDocuments({ role: 'student' });
    const totalInstructors = await userModel.countDocuments({ role: 'instructor' });

    res.status(200).json({
        message: 'home data fetched successfully',
        data: {
            newCourses,
            trendingCourses,
            stats: {
                totalCourses,
                totalStudents,
                totalInstructors,
            }
        }
    });
});
