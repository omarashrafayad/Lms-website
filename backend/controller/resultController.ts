import Result from '../model/resultModel';
import * as factory from './handleFactory';
import asyncHandler from 'express-async-handler';
import Exam from '../model/examModel';
import ApiError from '../utils/apiError';

export const submitExam = asyncHandler(async (req, res, next) => {
    const { examId, answers } = req.body;
    const exam = await Exam.findById(examId);

    if (!exam) return next(new ApiError('Exam not found', 404));

    let correctAnswersCount = 0;
    exam.questions.forEach((q, index) => {
        if (answers[index] === q.correctAnswer) {
            correctAnswersCount++;
        }
    });

    const score = (correctAnswersCount / exam.questions.length) * 100;
    const status = score >= exam.passingScore ? 'passed' : 'failed';

    const result = await Result.create({
        user: req.user?._id,
        exam: examId,
        score,
        status,
        answers
    });

    res.status(201).json({ status: 'success', data: result });
});

export const getMyResults = asyncHandler(async (req, res, next) => {
    const results = await Result.find({ user: req.user?._id }).populate('exam');
    res.status(200).json({ status: 'success', results: results.length, data: results });
});

export const getAllResults = factory.getAll(Result);
