import clientAxios from "@/lib/axios/clientAxios";

export const getExams = async (params: { page?: number; limit?: number } = {}) => {
  const res = await clientAxios.get("exams", { params });
  return res.data;
};

export const deleteExam = async (id: string) => {
  const res = await clientAxios.delete(`exams/${id}`);
  return res.data;
};

export const createExam = async (data: any) => {
  const res = await clientAxios.post("exams", data);
  return res.data;
};

export const updateExam = async (id: string, data: any) => {
  const res = await clientAxios.patch(`exams/${id}`, data);
  return res.data;
};
