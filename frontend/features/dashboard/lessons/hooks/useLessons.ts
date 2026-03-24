import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllLessons, getLesson, createLesson, updateLesson, deleteLesson } from "../api/lessonApi";
import { toast } from "sonner";

export const useAllLessons = (params?: any) => {
    return useQuery({
        queryKey: ["all-lessons", params],
        queryFn: () => getAllLessons(params),
        retry: false
    });
};

export const useCreateLesson = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createLesson,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["all-lessons"] });
            toast.success("Lesson created successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to create lesson");
        }
    });
};

export const useUpdateLesson = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => updateLesson(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["all-lessons"] });
            toast.success("Lesson updated successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to update lesson");
        }
    });
};

export const useDeleteLesson = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteLesson,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["all-lessons"] });
            toast.success("Lesson deleted successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to delete lesson");
        }
    });
};
