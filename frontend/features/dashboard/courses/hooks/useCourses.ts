"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCourses, deleteCourse, createCourse, updateCourse } from "../api/coursesApi";
import { toast } from "sonner";

export const useAllCourses = (params: { page?: number; limit?: number } = {}) => {
  return useQuery({
    queryKey: ["dashboard-courses", params],
    queryFn: () => getCourses(params),
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard-courses"] });
      toast.success("Course deleted successfully");
    },
    onError: () => {
        toast.error("Failed to delete course");
    }
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard-courses"] });
      toast.success("Course created successfully");
    },
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateCourse(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard-courses"] });
      toast.success("Course updated successfully");
    },
  });
};
