import mongoose, { Document, Types, Schema } from "mongoose";

interface IQuestion {
    question: string;
    options: string[];
    correctAnswer: number; // index of options
}

export interface IExam extends Document {
    title: string;
    course: Types.ObjectId;
    duration: number; // in minutes
    questions: IQuestion[];
    totalMarks: number;
    passingScore: number;
}

const examSchema = new mongoose.Schema<IExam>(
    {
        title: {
            type: String,
            required: [true, 'Exam title is required'],
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: [true, 'Exam must belong to a course'],
        },
        duration: {
            type: Number,
            required: true,
        },
        questions: [
            {
                question: String,
                options: [String],
                correctAnswer: Number,
            },
        ],
        totalMarks: {
            type: Number,
            default: 100,
        },
        passingScore: {
            type: Number,
            default: 50,
        },
    },
    { timestamps: true }
);

const Exam = mongoose.model<IExam>('Exam', examSchema);
export default Exam;
