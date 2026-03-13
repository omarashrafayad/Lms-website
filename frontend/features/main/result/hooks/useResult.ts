"use client"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getMyResults, submitExam, getAllResults } from "../api/resultApi"
import { toast } from "sonner"

export const useMyResults = () => {
    return useQuery({
        queryKey: ["my-results"],
        queryFn: getMyResults,
        retry: false
    })
}

export const useSubmitExam = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: submitExam,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-results"] })
            toast.success("Exam submitted successfully")
        },
        onError: () => {
            toast.error("Failed to submit exam")
        }
    })
}

export const useAllResults = (params?: any) => {
    return useQuery({
        queryKey: ["all-results", params],
        queryFn: () => getAllResults(params),
        retry: false
    })
}
