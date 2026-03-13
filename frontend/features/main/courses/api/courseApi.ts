import clientAxios from "@/lib/axios/clientAxios";
import { CourseResponse, CoursesResponse } from "../types/course.types";

export const getAllCourses = async (params?: any): Promise<CoursesResponse> => {
    const res = await clientAxios.get("courses", { params });
    return res.data;
};

export const getCourse = async (id: string): Promise<CourseResponse> => {
    const res = await clientAxios.get(`courses/${id}`);
    return res.data;
};
