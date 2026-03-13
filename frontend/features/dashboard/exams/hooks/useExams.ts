"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getExams, deleteExam, createExam, updateExam } from "../api/examsApi";
import { toast } from "sonner";

export const useAllExams = (params: { page?: number; limit?: number } = {}) => {
  return useQuery({
    queryKey: ["dashboard-exams", params],
    queryFn: () => getExams(params),
  });
};

export const useDeleteExam = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteExam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard-exams"] });
      toast.success("Exam deleted successfully");
    },
  });
};

export const useCreateExam = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createExam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard-exams"] });
      toast.success("Exam created successfully");
    },
  });
};
