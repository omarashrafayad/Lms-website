import Exam from '../model/examModel';
import * as factory from './handleFactory';

export const getAllExams = factory.getAll(Exam);
export const getExam = factory.getOne(Exam);
export const createExam = factory.createOne(Exam);
export const updateExam = factory.updateOne(Exam);
export const deleteExam = factory.deleteOne(Exam);
