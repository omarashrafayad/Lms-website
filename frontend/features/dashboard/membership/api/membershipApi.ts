import clientAxios from "@/lib/axios/clientAxios";

export const getPlans = async (params: { page?: number; limit?: number } = {}) => {
  const res = await clientAxios.get("membership-plans", { params });
  return res.data;
};

export const deletePlan = async (id: string) => {
  const res = await clientAxios.delete(`membership-plans/${id}`);
  return res.data;
};

export const createPlan = async (data: any) => {
  const res = await clientAxios.post("membership-plans", data);
  return res.data;
};

export const updatePlan = async (id: string, data: any) => {
  const res = await clientAxios.patch(`membership-plans/${id}`, data);
  return res.data;
};
