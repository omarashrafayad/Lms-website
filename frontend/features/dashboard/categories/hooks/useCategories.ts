"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategories, deleteCategory, createCategory, updateCategory } from "../api/categoriesApi";
import { toast } from "sonner";

export const useAllCategories = (params: { page?: number; limit?: number } = {}) => {
  return useQuery({
    queryKey: ["dashboard-categories", params],
    queryFn: () => getCategories(params),
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard-categories"] });
      toast.success("Category deleted successfully");
    },
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard-categories"] });
      toast.success("Category created successfully");
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard-categories"] });
      toast.success("Category updated successfully");
    },
  });
};
