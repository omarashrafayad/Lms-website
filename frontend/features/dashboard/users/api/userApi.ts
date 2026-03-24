import clientAxios from "@/lib/axios/clientAxios";
import { UsersResponse } from "../types/user.types";

export const getAllUsers = async (params?: any): Promise<UsersResponse> => {
    const res = await clientAxios.get("user", { params });
    return res.data;
};

export const deleteUser = async (id: string) => {
    const res = await clientAxios.delete(`user/${id}`);
    return res.data;
};

export const createUser = async (data: any) => {
    const res = await clientAxios.post("user", data);
    return res.data;
};

export const updateUser = async ({ userId, data }: { userId: string, data: any }) => {
    const res = await clientAxios.put(`user/${userId}`, data);
    return res.data;
};
