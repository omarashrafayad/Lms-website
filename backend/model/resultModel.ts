import mongoose, { Document, Types, Schema } from "mongoose";

export interface IResult extends Document {
    user: Types.ObjectId;
    exam: Types.ObjectId;
    score: number;
    status: 'pass' | 'fail';
    answers: number[]; // user's selected option indices
    correctAnswers: number;
    wrongAnswers: number;
    totalQuestions: number;
}

const resultSchema = new mongoose.Schema<IResult>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        exam: {
            type: Schema.Types.ObjectId,
            ref: 'Exam',
            required: true,
        },
        score: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['pass', 'fail'],
            required: true,
        },
        answers: [Number],
        correctAnswers: {
            type: Number,
            required: true,
        },
        wrongAnswers: {
            type: Number,
            required: true,
        },
        totalQuestions: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const Result = mongoose.model<IResult>('Result', resultSchema);
export default Result;
