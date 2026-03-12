import Lesson from '../model/lessonModel';
import * as factory from './handleFactory';

export const getAllLessons = factory.getAll(Lesson);
export const getLesson = factory.getOne(Lesson);
export const createLesson = factory.createOne(Lesson);
export const updateLesson = factory.updateOne(Lesson);
export const deleteLesson = factory.deleteOne(Lesson);
