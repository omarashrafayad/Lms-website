"use client"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAllUsers, deleteUser } from "../api/userApi"
import { toast } from "sonner"

export const useUsers = (params?: any) => {
    return useQuery({
        queryKey: ["users", params],
        queryFn: () => getAllUsers(params),
        retry: false
    })
}

export const useDeleteUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] })
            toast.success("User deleted successfully")
        },
        onError: () => {
            toast.error("Failed to delete user")
        }
    })
}
