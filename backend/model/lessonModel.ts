import mongoose, { Document, Types, Schema } from "mongoose";

export interface ILesson extends Document {
    title: string;
    description?: string;
    videoUrl?: string;
    duration?: string;
    course: Types.ObjectId;
    order: number;
}

const lessonSchema = new mongoose.Schema<ILesson>(
    {
        title: {
            type: String,
            required: [true, 'Lesson title is required'],
            trim: true,
        },
        description: String,
        videoUrl: String,
        duration: String,
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: [true, 'Lesson must belong to a course'],
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const Lesson = mongoose.model<ILesson>('Lesson', lessonSchema);
export default Lesson;
