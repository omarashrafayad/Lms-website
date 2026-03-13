"use client"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getCart, addToCart, removeFromCart, clearCart, createOrder } from "../api/checkoutApi"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export const useCart = () => {
    return useQuery({
        queryKey: ["cart"],
        queryFn: getCart,
        retry: false
    })
}

export const useAddToCart = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: addToCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] })
            toast.success("Added to cart")
        },
        onError: () => {
            toast.error("Failed to add to cart")
        }
    })
}

export const useRemoveFromCart = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: removeFromCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] })
            toast.success("Removed from cart")
        }
    })
}

export const useCreateOrder = () => {
    const router = useRouter()
    return useMutation({
        mutationFn: createOrder,
        onSuccess: () => {
            toast.success("Order created successfully")
            router.push('/dashboard')
        },
        onError: () => {
            toast.error("Failed to create order")
        }
    })
}
