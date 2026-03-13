import clientAxios from "@/lib/axios/clientAxios";

export const getOrders = async (params: { page?: number; limit?: number } = {}) => {
  const res = await clientAxios.get("order", { params });
  return res.data;
};

export const updateOrderStatus = async (id: string, status: string) => {
  const res = await clientAxios.patch(`order/${id}/deliver`, { status });
  return res.data;
};
