import Blog from '../model/blogModel';
import * as factory from './handleFactory';
import asyncHandler from 'express-async-handler';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { uploadSingleImage } from '../middlewares/uploadImageMiddleware';

export const uploadBlogImage = uploadSingleImage('imageCover');

export const resizeBlogImage = asyncHandler(async (req, res, next) => {
    if (!req.file) return next();

    const filename = `blog-${uuidv4()}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .resize(1200, 800)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`uploads/blogs/${filename}`);

    req.body.imageCover = filename;
    next();
});

export const getAllBlogs = factory.getAll(Blog);
export const getBlog = factory.getOne(Blog);
export const createBlog = factory.createOne(Blog);
export const updateBlog = factory.updateOne(Blog);
export const deleteBlog = factory.deleteOne(Blog);
