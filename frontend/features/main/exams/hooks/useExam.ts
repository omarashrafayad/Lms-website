"use client"
import { useQuery } from "@tanstack/react-query"
import { getAllExams, getExam } from "../api/examApi"

export const useExams = (params?: any) => {
    return useQuery({
        queryKey: ["exams", params],
        queryFn: () => getAllExams(params),
        retry: false
    })
}

export const useExam = (id: string) => {
    return useQuery({
        queryKey: ["exam", id],
        queryFn: () => getExam(id),
        enabled: !!id,
        retry: false
    })
}
