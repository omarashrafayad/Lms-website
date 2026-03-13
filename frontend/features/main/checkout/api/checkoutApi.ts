import clientAxios from "@/lib/axios/clientAxios";
import { CartResponse } from "../types/checkout.types";

export const getCart = async (): Promise<CartResponse> => {
    const res = await clientAxios.get("cart");
    return res.data;
};

export const addToCart = async (courseId: string): Promise<CartResponse> => {
    const res = await clientAxios.post("cart", { courseId });
    return res.data;
};

export const removeFromCart = async (itemId: string): Promise<CartResponse> => {
    const res = await clientAxios.delete(`cart/${itemId}`);
    return res.data;
};

export const clearCart = async () => {
    const res = await clientAxios.delete("cart");
    return res.data;
};

export const createOrder = async (cartId: string) => {
    const res = await clientAxios.post(`order/${cartId}`);
    return res.data;
};
