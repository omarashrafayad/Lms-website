"use client"

import { useAllLessons, useDeleteLesson, useCreateLesson, useUpdateLesson } from "../hooks/useLessons"
import { useAllCourses } from "../../courses/hooks/useCourses"
import UniTable, { ActionCell, ActionButton } from "@/components/shared/UniTable"
import { Trash2, Pencil, Plus, Loader2, Book, Play, Clock, LayoutList } from "lucide-react"
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
import { cn } from "@/lib/utils"

const lessonSchema = z.object({
    title: z.string().min(3, "Too short lesson title"),
    description: z.string().optional(),
    videoUrl: z.string().url("Invalid Video URL").or(z.literal("")),
    duration: z.string().optional(),
    course: z.string().nonempty("Course selection is required"),
    order: z.coerce.number().default(0),
})

type LessonFormData = z.infer<typeof lessonSchema>

export default function LessonsTemplate() {
    const [page, setPage] = useState(1)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [currentLesson, setCurrentLesson] = useState<any | null>(null)

    const { data: lessonsData, isLoading } = useAllLessons({ page, limit: 10 })
    const { data: coursesResponse } = useAllCourses({ limit: 100 })

    const deleteMutation = useDeleteLesson()
    const createMutation = useCreateLesson()
    const updateMutation = useUpdateLesson()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(lessonSchema) as any,
    })

    const handleEdit = (lesson: any) => {
        setIsEditing(true)
        setCurrentLesson(lesson)
        reset({
            title: lesson.title,
            description: lesson.description || "",
            videoUrl: lesson.videoUrl || "",
            duration: lesson.duration || "",
            course: lesson.course?._id || lesson.course,
            order: lesson.order || 0,
        })
        setIsDialogOpen(true)
    }

    const handleOpenDialog = () => {
        setIsEditing(false)
        setCurrentLesson(null)
        reset({
            title: "",
            description: "",
            videoUrl: "",
            duration: "",
            course: "",
            order: 0,
        })
        setIsDialogOpen(true)
    }

    const onSubmit = async (data: any) => {
        try {
            if (isEditing && currentLesson) {
                await updateMutation.mutateAsync({ id: currentLesson._id, data })
            } else {
                await createMutation.mutateAsync(data)
            }
            setIsDialogOpen(false)
            reset()
        } catch (error: any) {
            // Error managed by mutation hooks
        }
    }

    const columns = [
        {
            id: "lesson",
            header: "Lesson Title",
            accessorKey: "title",
            cell: (value: any, row: any) => (
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Play className="size-5 fill-primary" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-black text-zinc-900 leading-tight">{row.title}</span>
                        <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">{row.course?.title || "No Course"}</span>
                    </div>
                </div>
            )
        },
        {
            id: "duration",
            header: "Duration",
            accessorKey: "duration",
            cell: (value: any) => (
                <div className="flex items-center gap-2 text-zinc-500 font-medium">
                    <Clock size={14} className="text-primary" />
                    <span>{value || "---"}</span>
                </div>
            )
        },
        {
            id: "order",
            header: "Sequence",
            accessorKey: "order",
            cell: (value: any) => (
                <div className="flex items-center gap-2 text-primary font-black">
                    <LayoutList size={14} />
                    <span># {value || 0}</span>
                </div>
            )
        },
        {
            id: "actions",
            header: "Actions",
            cell: (value: any, row: any) => (
                <ActionCell>
                    <ActionButton icon={Pencil} onClick={() => handleEdit(row)} />
                    <ActionButton icon={Trash2} variant="danger" onClick={() => {
                        if (confirm("Are you sure you want to delete this lesson?")) {
                            deleteMutation.mutate(row._id)
                        }
                    }} />
                </ActionCell>
            )
        }
    ]

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black tracking-tight text-zinc-900 uppercase">Curriculum Management</h2>
                    <p className="text-zinc-500 font-medium">Control your course lessons, video content and ordering.</p>
                </div>
                <Button onClick={handleOpenDialog} className="rounded-xl flex gap-2 cursor-pointer shadow-lg shadow-primary/20 bg-primary text-white h-12 px-6 font-bold uppercase text-xs tracking-widest">
                    <Plus className="size-4" /> Add New Lesson
                </Button>
            </div>

            {isLoading ? (
                <div className="flex h-64 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
                <UniTable
                    data={lessonsData?.data || []}
                    columns={columns}
                    enablePagination
                    pageSize={10}
                    serverPagination={{
                        currentPage: lessonsData?.paginationResult.currentPage || 1,
                        totalPages: lessonsData?.paginationResult.numberOfPages || 1,
                        totalItems: lessonsData?.results || 0,
                        onPageChange: (p) => setPage(p)
                    }}
                />
            )}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-3xl rounded-[2.5rem] p-0 border-none bg-white shadow-2xl overflow-hidden">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogHeader className="p-8 border-b border-zinc-50 bg-zinc-50/50">
                            <DialogTitle className="text-2xl font-black text-zinc-900 uppercase tracking-tight">{isEditing ? "Update Curriculum" : "New Lesson"}</DialogTitle>
                            <DialogDescription className="text-zinc-500 font-medium">
                                Configure video lessons and associate them with a course.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2.5">
                                    <Label htmlFor="title" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Lesson Title</Label>
                                    <Input id="title" {...register("title")} className="h-14 rounded-2xl bg-zinc-50 border-none px-5 transition-all focus:bg-white focus:ring-2 focus:ring-primary/10" placeholder="e.g. Introduction to Figma" />
                                    {errors.title && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{String(errors.title.message)}</p>}
                                </div>

                                <div className="space-y-2.5">
                                    <Label htmlFor="course" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Parent Course</Label>
                                    <select id="course" {...register("course")} className="flex h-14 w-full items-center justify-between rounded-2xl bg-zinc-50 border-none px-5 py-2 text-sm text-zinc-700 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all outline-none font-bold">
                                        <option value="">Select Target Course...</option>
                                        {coursesResponse?.data?.map((course: any) => (
                                            <option key={course._id} value={course._id}>{course.title}</option>
                                        ))}
                                    </select>
                                    {errors.course && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{String(errors.course.message)}</p>}
                                </div>

                                <div className="space-y-2.5">
                                    <Label htmlFor="duration" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Duration (MM:SS)</Label>
                                    <Input id="duration" {...register("duration")} className="h-14 rounded-2xl bg-zinc-50 border-none px-5" placeholder="e.g. 10:45" />
                                </div>

                                <div className="space-y-2.5">
                                    <Label htmlFor="order" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Display Order</Label>
                                    <Input id="order" type="number" {...register("order")} className="h-14 rounded-2xl bg-zinc-50 border-none px-5" />
                                </div>
                            </div>

                            <div className="space-y-2.5">
                                <Label htmlFor="videoUrl" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Video Resource (URL)</Label>
                                <Input id="videoUrl" {...register("videoUrl")} className="h-14 rounded-2xl bg-zinc-50 border-none px-5" placeholder="https://youtube.com/..." />
                                {errors.videoUrl && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{String(errors.videoUrl.message)}</p>}
                            </div>

                            <div className="space-y-2.5">
                                <Label htmlFor="description" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Description</Label>
                                <textarea id="description" {...register("description")} rows={4} className="flex min-h-[120px] w-full rounded-2xl bg-zinc-50 border-none px-5 py-4 text-sm focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all outline-none" placeholder="What will students learn in this lesson?"></textarea>
                            </div>
                        </div>

                        <DialogFooter className="p-8 border-t border-zinc-50 bg-zinc-50/50 flex items-center justify-end gap-4">
                            <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl h-12 px-8 font-bold text-zinc-400 hover:text-zinc-600 transition-colors uppercase text-[10px] tracking-widest">Discard</Button>
                            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="rounded-xl h-12 px-10 font-black bg-primary hover:bg-primary/95 text-white shadow-2xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95 uppercase text-[10px] tracking-widest">
                                {createMutation.isPending || updateMutation.isPending ? <Loader2 className="animate-spin" /> : (isEditing ? "Save Amendments" : "Confirm & Save")}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
