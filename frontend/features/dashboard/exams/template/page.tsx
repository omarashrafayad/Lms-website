"use client"

import { useAllExams, useDeleteExam, useCreateExam, useUpdateExam } from "../hooks/useExams"
import { useAllCourses } from "../../courses/hooks/useCourses"
import UniTable, { ActionCell, ActionButton } from "@/components/shared/UniTable"
import { Trash2, Pencil, Plus, Loader2, Clock, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"

const examSchema = z.object({
    title: z.string().min(3, "Too short exam title"),
    course: z.string().nonempty("Course ID is required"),
    duration: z.coerce.number().min(1, "Duration must be at least 1 minute"),
})

export default function ExamsTemplate() {
    const [page, setPage] = useState(1)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [currentExam, setCurrentExam] = useState<any | null>(null)

    const { data: examsData, isLoading } = useAllExams({ page, limit: 10 })
    const { data: coursesResponse } = useAllCourses({ limit: 100 })
    const deleteMutation = useDeleteExam()
    const createMutation = useCreateExam()
    const updateMutation = useUpdateExam()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(examSchema) as any,
    })

    const handleEdit = (exam: any) => {
        setIsEditing(true)
        setCurrentExam(exam)
        reset({
            title: exam.title,
            course: exam.course?._id || exam.course,
            duration: exam.duration,
        })
        setIsDialogOpen(true)
    }

    const handleOpenDialog = () => {
        setIsEditing(false)
        setCurrentExam(null)
        reset({
            title: "",
            course: "",
            duration: 30,
        })
        setIsDialogOpen(true)
    }

    const onSubmit = async (data: any) => {
        try {
            if (isEditing && currentExam) {
                await updateMutation.mutateAsync({ id: currentExam._id, data })
            } else {
                await createMutation.mutateAsync(data)
            }
            setIsDialogOpen(false)
            reset()
        } catch (error: any) {
            toast.error(error.response?.data?.message || "An error occurred")
        }
    }

    const columns = [
        {
            id: "exam",
            header: "Exam Title",
            accessorKey: "title",
            cell: (value: any) => <span className="font-bold text-zinc-800">{value}</span>
        },
        {
            id: "duration",
            header: "Duration",
            accessorKey: "duration",
            cell: (value: any) => (
                <div className="flex items-center gap-2 text-zinc-500">
                    <Clock size={14} />
                    <span>{value} min</span>
                </div>
            )
        },
        {
            id: "questions",
            header: "Questions",
            accessorKey: "questions",
            cell: (value: any) => (
                <div className="flex items-center gap-2 text-zinc-500">
                    <HelpCircle size={14} />
                    <span>{value?.length || 0} Questions</span>
                </div>
            )
        },
        {
            id: "createdAt",
            header: "Created Date",
            accessorKey: "createdAt",
            cell: (value: any) => new Date(value).toLocaleDateString()
        },
        {
            id: "actions",
            header: "Actions",
            cell: (value: any, row: any) => (
                <ActionCell>
                    <ActionButton icon={Pencil} onClick={() => handleEdit(row)} />
                    <ActionButton icon={Trash2} variant="danger" onClick={() => {
                        if (confirm("Are you sure you want to delete this exam?")) {
                            deleteMutation.mutate(row._id)
                        }
                    }} />
                </ActionCell>
            )
        }
    ]

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Exams Management</h2>
                    <p className="text-zinc-500">Create and manage assessments for your students.</p>
                </div>
                <Button onClick={handleOpenDialog} className="rounded-xl flex gap-2 cursor-pointer shadow-lg shadow-primary/20 bg-primary text-white">
                    <Plus className="size-4" /> Add New Exam
                </Button>
            </div>

            {isLoading ? (
                <div className="flex h-64 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
                <UniTable
                    data={examsData?.data || []}
                    columns={columns}
                    enablePagination
                    pageSize={10}
                    serverPagination={{
                        currentPage: examsData?.paginationResult.currentPage || 1,
                        totalPages: examsData?.paginationResult.numberOfPages || 1,
                        totalItems: examsData?.results || 0,
                        onPageChange: (p) => setPage(p)
                    }}
                />
            )}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-md rounded-[2rem] p-0 border-none bg-white shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogHeader className="p-8 border-b border-gray-100">
                            <DialogTitle className="text-2xl font-bold text-gray-800">{isEditing ? "Update Exam" : "Create New Exam"}</DialogTitle>
                            <DialogDescription className="text-gray-500">
                                {isEditing ? "Modify this exam's details." : "Create a new exam module for a course."}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="p-8 space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-xs font-bold uppercase tracking-widest text-gray-500">Exam Title</Label>
                                <Input id="title" {...register("title")} className="h-12 rounded-xl bg-gray-50 border-none" />
                                {errors.title && <p className="text-red-500 text-xs mt-1">{String(errors.title.message)}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="course" className="text-xs font-bold uppercase tracking-widest text-gray-500">Course</Label>
                                <select id="course" {...register("course")} className="flex h-12 w-full items-center justify-between rounded-xl bg-gray-50 border-none px-3 py-2 text-sm text-gray-700">
                                    <option value="">Select Course...</option>
                                    {coursesResponse?.data?.map((course: any) => (
                                        <option key={course._id} value={course._id}>{course.title}</option>
                                    ))}
                                </select>
                                {errors.course && <p className="text-red-500 text-xs mt-1">{String(errors.course.message)}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="duration" className="text-xs font-bold uppercase tracking-widest text-gray-500">Duration (Minutes)</Label>
                                <Input id="duration" type="number" {...register("duration")} className="h-12 rounded-xl bg-gray-50 border-none" />
                                {errors.duration && <p className="text-red-500 text-xs mt-1">{String(errors.duration.message)}</p>}
                            </div>
                        </div>

                        <DialogFooter className="p-8 border-t border-gray-100 flex items-center justify-end gap-3">
                            <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl h-12 px-6">Cancel</Button>
                            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="rounded-xl h-12 px-8 font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                                {createMutation.isPending || updateMutation.isPending ? <Loader2 className="animate-spin" /> : (isEditing ? "Save Changes" : "Create Exam")}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
