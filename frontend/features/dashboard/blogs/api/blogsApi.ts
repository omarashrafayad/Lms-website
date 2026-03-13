import clientAxios from "@/lib/axios/clientAxios";

export const getBlogs = async (params: { page?: number; limit?: number } = {}) => {
  const res = await clientAxios.get("blogs", { params });
  return res.data;
};

export const deleteBlog = async (id: string) => {
  const res = await clientAxios.delete(`blogs/${id}`);
  return res.data;
};

export const createBlog = async (data: any) => {
  const res = await clientAxios.post("blogs", data);
  return res.data;
};

export const updateBlog = async (id: string, data: any) => {
  const res = await clientAxios.patch(`blogs/${id}`, data);
  return res.data;
};
