import mongoose, { Document, Types, Schema } from "mongoose";

export interface IResult extends Document {
    user: Types.ObjectId;
    exam: Types.ObjectId;
    score: number;
    status: 'passed' | 'failed';
    answers: number[]; // user's selected option indices
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
            enum: ['passed', 'failed'],
            required: true,
        },
        answers: [Number],
    },
    { timestamps: true }
);

const Result = mongoose.model<IResult>('Result', resultSchema);
export default Result;
