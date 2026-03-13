import clientAxios from "@/lib/axios/clientAxios";
import { BlogResponse, BlogsResponse } from "../types/blog.types";

export const getAllBlogs = async (params?: any): Promise<BlogsResponse> => {
    const res = await clientAxios.get("blogs", { params });
    return res.data;
};

export const getBlog = async (id: string): Promise<BlogResponse> => {
    const res = await clientAxios.get(`blogs/${id}`);
    return res.data;
};
