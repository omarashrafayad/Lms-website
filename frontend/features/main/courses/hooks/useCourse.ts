"use client"
import { useQuery } from "@tanstack/react-query"
import { getAllCourses, getCourse } from "../api/courseApi"

export const useCourses = (params?: any) => {
    return useQuery({
        queryKey: ["courses", params],
        queryFn: () => getAllCourses(params),
        retry: false
    })
}

export const useCourse = (id: string) => {
    return useQuery({
        queryKey: ["course", id],
        queryFn: () => getCourse(id),
        enabled: !!id,
        retry: false
    })
}
