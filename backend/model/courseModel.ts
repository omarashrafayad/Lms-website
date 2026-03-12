import mongoose from "mongoose";
import { Types, Schema, Document } from 'mongoose';

export interface ICourse extends Document {
    title: string;
    slug: string;
    description: string;
    instructor: Types.ObjectId;
    duration?: string;
    lessonsCount?: number;
    price: number;
    priceAfterDiscount?: number;
    imageCover: string;
    images?: string[];
    category: Types.ObjectId;
    subcategories?: Types.ObjectId[];
    ratingsAverage?: number;
    ratingsQuantity?: number;
}
const courseSchema = new mongoose.Schema<ICourse>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, 'Too short course title'],
            maxlength: [100, 'Too long course title'],
        },
        slug: {
            type: String,
            lowercase: true,
        },
        description: {
            type: String,
            required: [true, 'Course description is required'],
            minlength: [20, 'Too short course description'],
        },
        instructor: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Course must have an instructor'],
        },
        duration: String,
        lessonsCount: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            required: [true, 'Course price is required'],
            max: [200000, 'Too long course price'],
        },
        priceAfterDiscount: Number,
        imageCover: {
            type: String,
            required: [true, 'Course Image cover is required'],
        },
        images: [String],
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Course must belong to category'],
        },
        subcategories: [
            {
                type: Schema.Types.ObjectId,
                ref: 'SubCategory',
            },
        ],
        ratingsAverage: {
            type: Number,
            min: [1, 'Rating must be >= 1.0'],
            max: [5, 'Rating must be <= 5.0'],
            default: 1,
        },
        ratingsQuantity: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const setImageURL = (doc: ICourse) => {
    if (doc.imageCover) {
        const imageUrl = `${process.env.BASE_URL}/courses/${doc.imageCover}`;
        doc.imageCover = imageUrl;
    }
    if (doc.images) {
        const imagesList: any = [];
        doc.images.forEach((image) => {
            const imageUrl = `${process.env.BASE_URL}/courses/${image}`;
            imagesList.push(imageUrl);
        });
        doc.images = imagesList;
    }
};

courseSchema.post('init', (doc) => {
    setImageURL(doc);
});

courseSchema.post('save', (doc) => {
    setImageURL(doc);
});

const courseModel = mongoose.model<ICourse>('Course', courseSchema)
export default courseModel
