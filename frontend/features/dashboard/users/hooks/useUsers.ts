"use client"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAllUsers, deleteUser, createUser, updateUser } from "../api/userApi"
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

export const useCreateUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] })
            toast.success("User created successfully")
        },
        onError: () => {
            toast.error("Failed to create user")
        }
    })
}

export const useUpdateUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] })
            toast.success("User updated successfully")
        },
        onError: () => {
            toast.error("Failed to update user")
        }
    })
}
