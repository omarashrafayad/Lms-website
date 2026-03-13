import clientAxios from "@/lib/axios/clientAxios";
import { ResultResponse, ResultsResponse } from "../types/result.types";

export const getMyResults = async (): Promise<ResultsResponse> => {
    const res = await clientAxios.get("results/my-results");
    return res.data;
};

export const submitExam = async (data: { examId: string; answers: number[] }): Promise<ResultResponse> => {
    const res = await clientAxios.post("results/submit", data);
    return res.data;
};

export const getAllResults = async (params?: any): Promise<ResultsResponse> => {
    const res = await clientAxios.get("results", { params });
    return res.data;
};
