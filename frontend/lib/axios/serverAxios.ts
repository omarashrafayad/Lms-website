"use server";
import axios, { AxiosInstance } from "axios";
import { cookies } from "next/headers";


export const serverAxios: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1/",
  withCredentials: true,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

serverAxios.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default serverAxios;

