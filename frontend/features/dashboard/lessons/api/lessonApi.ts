import clientAxios from "@/lib/axios/clientAxios";
import { LessonResponse, LessonsResponse } from "../types/lesson.types";

export const getAllLessons = async (params?: any): Promise<LessonsResponse> => {
    const res = await clientAxios.get("lessons", { params });
    return res.data;
};

export const getLesson = async (id: string): Promise<LessonResponse> => {
    const res = await clientAxios.get(`lessons/${id}`);
    return res.data;
};

export const createLesson = async (data: any): Promise<LessonResponse> => {
    const res = await clientAxios.post("lessons", data);
    return res.data;
};

export const updateLesson = async (id: string, data: any): Promise<LessonResponse> => {
    const res = await clientAxios.patch(`lessons/${id}`, data);
    return res.data;
};

export const deleteLesson = async (id: string): Promise<void> => {
    await clientAxios.delete(`lessons/${id}`);
};
