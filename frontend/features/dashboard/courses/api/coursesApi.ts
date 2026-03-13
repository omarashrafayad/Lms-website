import clientAxios from "@/lib/axios/clientAxios";
import { CoursesResponse, Course } from "../../../main/courses/types/course.types";

export const getCourses = async (params: { page?: number; limit?: number } = {}): Promise<CoursesResponse> => {
  const res = await clientAxios.get("courses", { params });
  return res.data;
};

export const deleteCourse = async (id: string) => {
  const res = await clientAxios.delete(`courses/${id}`);
  return res.data;
};

export const createCourse = async (data: any) => {
  const res = await clientAxios.post("courses", data);
  return res.data;
};

export const updateCourse = async (id: string, data: any) => {
  const res = await clientAxios.patch(`courses/${id}`, data);
  return res.data;
};
