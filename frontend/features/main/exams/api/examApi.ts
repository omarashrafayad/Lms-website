import clientAxios from "@/lib/axios/clientAxios";
import { ExamResponse, ExamsResponse } from "../types/exam.types";

export const getAllExams = async (params?: any): Promise<ExamsResponse> => {
    const res = await clientAxios.get("exams", { params });
    return res.data;
};

export const getExam = async (id: string): Promise<ExamResponse> => {
    const res = await clientAxios.get(`exams/${id}`);
    return res.data;
};
