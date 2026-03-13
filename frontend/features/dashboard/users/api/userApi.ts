import clientAxios from "@/lib/axios/clientAxios";
import { UsersResponse } from "../types/user.types";

export const getAllUsers = async (params?: any): Promise<UsersResponse> => {
    const res = await clientAxios.get("users", { params });
    return res.data;
};

export const deleteUser = async (id: string) => {
    const res = await clientAxios.delete(`users/${id}`);
    return res.data;
};
