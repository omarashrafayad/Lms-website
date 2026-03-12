import mongoose, { Types, Model, Document } from 'mongoose';
import Course from './courseModel';

export interface IReview extends Document {
    title?: string;
    ratings: number;
    user: Types.ObjectId;
    course: Types.ObjectId;
}

interface ReviewModel extends Model<IReview> {
    calcAverageRatingsAndQuantity(courseId: Types.ObjectId): Promise<void>;
}

const reviewSchema = new mongoose.Schema<IReview>(
    {
        title: {
            type: String,
        },
        ratings: {
            type: Number,
            min: [1, 'Min ratings value is 1.0'],
            max: [5, 'Max ratings value is 5.0'],
            required: [true, 'review ratings required'],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Review must belong to user'],
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: [true, 'Review must belong to course'],
        },
    },
    { timestamps: true }
);

reviewSchema.pre(/^find/, function () {
    (this as any).populate({
        path: 'user',
        select: 'name -_id',
    });
});
reviewSchema.pre(/^find/, function () {
    (this as any).populate({
        path: 'course',
        select: 'title -_id',
    });
});

reviewSchema.statics.calcAverageRatingsAndQuantity = async function (
    courseId: Types.ObjectId
) {
    const result = await this.aggregate([
        {
            $match: { course: courseId },
        },
        {
            $group: {
                _id: '$course',
                avgRatings: { $avg: '$ratings' },
                ratingsQuantity: { $sum: 1 },
            },
        },
    ]);

    if (result.length > 0) {
        await Course.findByIdAndUpdate(courseId, {
            ratingsAverage: result[0].avgRatings,
            ratingsQuantity: result[0].ratingsQuantity,
        });
    } else {
        await Course.findByIdAndUpdate(courseId, {
            ratingsAverage: 0,
            ratingsQuantity: 0,
        });
    }
};


reviewSchema.post('save', async function () {
    const reviewModel = this.constructor as ReviewModel;
    await reviewModel.calcAverageRatingsAndQuantity(this.course);
});

reviewSchema.post('findOneAndDelete', async function (doc: any) {
    if (doc) {
        const reviewModel = this.model as ReviewModel;
        await reviewModel.calcAverageRatingsAndQuantity(doc.course);
    }
});

const reviewModel = mongoose.model<IReview>('Review', reviewSchema);
export default reviewModel;
