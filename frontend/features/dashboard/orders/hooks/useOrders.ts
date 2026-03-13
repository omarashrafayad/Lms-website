"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrders, updateOrderStatus } from "../api/ordersApi";
import { toast } from "sonner";

export const useAllOrders = (params: { page?: number; limit?: number } = {}) => {
  return useQuery({
    queryKey: ["dashboard-orders", params],
    queryFn: () => getOrders(params),
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard-orders"] });
      toast.success("Order status updated");
    },
  });
};
