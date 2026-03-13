"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBlogs, deleteBlog, createBlog, updateBlog } from "../api/blogsApi";
import { toast } from "sonner";

export const useAllBlogs = (params: { page?: number; limit?: number } = {}) => {
  return useQuery({
    queryKey: ["dashboard-blogs", params],
    queryFn: () => getBlogs(params),
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard-blogs"] });
      toast.success("Blog post deleted successfully");
    },
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard-blogs"] });
      toast.success("Blog post created successfully");
    },
  });
};
