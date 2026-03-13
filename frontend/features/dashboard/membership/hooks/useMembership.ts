"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPlans, deletePlan, createPlan, updatePlan } from "../api/membershipApi";
import { toast } from "sonner";

export const useAllPlans = (params: { page?: number; limit?: number } = {}) => {
  return useQuery({
    queryKey: ["dashboard-membership-plans", params],
    queryFn: () => getPlans(params),
  });
};

export const useDeletePlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard-membership-plans"] });
      toast.success("Plan deleted successfully");
    },
  });
};

export const useCreatePlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard-membership-plans"] });
      toast.success("Plan created successfully");
    },
  });
};
