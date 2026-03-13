"use client"
import { useQuery } from "@tanstack/react-query"
import { getAllBlogs, getBlog } from "../api/blogApi"

export const useBlogs = (params?: any) => {
    return useQuery({
        queryKey: ["blogs", params],
        queryFn: () => getAllBlogs(params),
        retry: false
    })
}

export const useBlog = (id: string) => {
    return useQuery({
        queryKey: ["blog", id],
        queryFn: () => getBlog(id),
        enabled: !!id,
        retry: false
    })
}
