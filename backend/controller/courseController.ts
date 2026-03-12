import Course from '../model/courseModel'
import * as factory from './handleFactory';
import asyncHandler from 'express-async-handler';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { uploadMixOfImages } from '../middlewares/uploadImageMiddleware';


export const uploadCourseImages = uploadMixOfImages([
    {
        name: 'imageCover',
        maxCount: 1,
    },
    {
        name: 'images',
        maxCount: 5,
    },
]);

export const resizeCourseImages = asyncHandler(
    async (req, res, next) => {
        if (!req.files) return next();

        const files = req.files as {
            imageCover?: Express.Multer.File[];
            images?: Express.Multer.File[];
        };

        if (files.imageCover && files.imageCover.length > 0) {
            const imageCoverFileName = `course-${uuidv4()}-${Date.now()}-cover.jpeg`;

            await sharp(files.imageCover[0].buffer)
                .resize(2000, 1333)
                .toFormat('jpeg')
                .jpeg({ quality: 95 })
                .toFile(`uploads/courses/${imageCoverFileName}`);

            req.body.imageCover = imageCoverFileName;
        }

        if (files.images && files.images.length > 0) {
            req.body.images = [];

            await Promise.all(
                files.images.map(
                    async (img: Express.Multer.File, index: number) => {
                        const imageName = `course-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;

                        await sharp(img.buffer)
                            .resize(2000, 1333)
                            .toFormat('jpeg')
                            .jpeg({ quality: 95 })
                            .toFile(`uploads/courses/${imageName}`);

                        req.body.images.push(imageName);
                    }
                )
            );
        }

        next();
    }
);


export const getAllCourses = factory.getAll(Course, 'courses');

export const getCourse = factory.getOne(Course);

export const createCourse = factory.createOne(Course);

export const updateCourse = factory.updateOne(Course);

export const deleteCourse = factory.deleteOne(Course);