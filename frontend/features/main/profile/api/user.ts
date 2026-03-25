import clientAxios from "@/lib/axios/clientAxios";
import { updatePasswordFormData } from "../schemas/user.schema";

export const updateProfile = async (formData: FormData) => {
  try {
    const res = await clientAxios.patch("user/updateMe", formData);
    return res.data;
  } catch (error) {
    const res = await clientAxios.patch("users/updateMe", formData);
    return res.data;
  }
};

export const updatePassword = async (data: updatePasswordFormData) => {
  try {
    const res = await clientAxios.patch("user/changeMyPassword", data);
    return res.data;
  } catch (error) {
    const res = await clientAxios.patch("users/changeMyPassword", data);
    return res.data;
  }
};
