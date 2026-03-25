"use client"

import { useAllExams, useDeleteExam, useCreateExam, useUpdateExam } from "../hooks/useExams"
import { useAllCourses } from "../../courses/hooks/useCourses"
import UniTable, { ActionCell, ActionButton } from "@/components/shared/UniTable"
import { Trash2, Pencil, Plus, Loader2, Clock, HelpCircle, Trophy, CheckCircle2 } from "lucide-react"
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
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"

const questionSchema = z.object({
    question: z.string().min(1, "Question text is required"),
    options: z.array(z.string().min(1, "Option cannot be empty")).min(2, "At least 2 options are required"),
    correctAnswer: z.coerce.number().min(0, "Correct answer is required"),
});

const examSchema = z.object({
    title: z.string().min(3, "Too short exam title"),
    course: z.string().nonempty("Course ID is required"),
    duration: z.coerce.number().min(1, "Duration must be at least 1 minute"),
    totalMarks: z.coerce.number().min(1, "Total marks must be at least 1"),
    passingScore: z.coerce.number().min(1, "Passing score must be at least 1"),
    questions: z.array(questionSchema).min(1, "At least one question is required"),
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
        control,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(examSchema) as any,
        defaultValues: {
            title: "",
            course: "",
            duration: 30,
            totalMarks: 100,
            passingScore: 50,
            questions: [{ question: "", options: ["", "", "", ""], correctAnswer: 0 }]
        }
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: "questions"
    })

    const handleEdit = (exam: any) => {
        setIsEditing(true)
        setCurrentExam(exam)
        reset({
            title: exam.title,
            course: exam.course?._id || exam.course,
            duration: exam.duration,
            totalMarks: exam.totalMarks || 100,
            passingScore: exam.passingScore || 50,
            questions: exam.questions?.length > 0 ? exam.questions : [{ question: "", options: ["", "", "", ""], correctAnswer: 0 }]
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
            totalMarks: 100,
            passingScore: 50,
            questions: [{ question: "", options: ["", "", "", ""], correctAnswer: 0 }]
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
            id: "score",
            header: "ScoreInfo",
            cell: (value: any, row: any) => (
                <div className="flex flex-col text-xs text-zinc-500">
                    <span>Total: {row.totalMarks}</span>
                    <span>Pass: {row.passingScore}</span>
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
                <DialogContent className="max-w-4xl max-h-[90vh] rounded-[2rem] p-0 border-none bg-white shadow-2xl flex flex-col overflow-hidden">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full overflow-hidden">
                        <DialogHeader className="p-8 border-b border-gray-100 flex-shrink-0">
                            <DialogTitle className="text-2xl font-bold text-gray-800">{isEditing ? "Update Exam" : "Create New Exam"}</DialogTitle>
                            <DialogDescription className="text-gray-500">
                                {isEditing ? "Modify this exam's details and questions." : "Create a new exam module for a course."}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex-grow p-8 overflow-y-auto">
                            <div className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="title" className="text-xs font-bold uppercase tracking-widest text-gray-500">Exam Title</Label>
                                        <Input id="title" {...register("title")} className="h-12 rounded-xl bg-gray-50 border-none" placeholder="Final Geography Exam" />
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
                                        <div className="relative">
                                            <Input id="duration" type="number" {...register("duration")} className="h-12 rounded-xl bg-gray-50 border-none pl-10" />
                                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                                        </div>
                                        {errors.duration && <p className="text-red-500 text-xs mt-1">{String(errors.duration.message)}</p>}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="totalMarks" className="text-xs font-bold uppercase tracking-widest text-gray-500">Total Marks</Label>
                                            <div className="relative">
                                                <Input id="totalMarks" type="number" {...register("totalMarks")} className="h-12 rounded-xl bg-gray-50 border-none pl-10" />
                                                <Trophy className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                                            </div>
                                            {errors.totalMarks && <p className="text-red-500 text-xs mt-1">{String(errors.totalMarks.message)}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="passingScore" className="text-xs font-bold uppercase tracking-widest text-gray-500">Passing Score</Label>
                                            <div className="relative">
                                                <Input id="passingScore" type="number" {...register("passingScore")} className="h-12 rounded-xl bg-gray-50 border-none pl-10" />
                                                <CheckCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                                            </div>
                                            {errors.passingScore && <p className="text-red-500 text-xs mt-1">{String(errors.passingScore.message)}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-sm font-bold uppercase tracking-widest text-gray-500">Questions ({fields.length})</Label>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => append({ question: "", options: ["", "", "", ""], correctAnswer: 0 })}
                                            className="rounded-lg flex gap-2 border-primary text-primary hover:bg-primary/5"
                                        >
                                            <Plus className="size-3" /> Add Question
                                        </Button>
                                    </div>
                                    
                                    {errors.questions && <p className="text-red-500 text-xs mt-1">{String(errors.questions.message)}</p>}

                                    <div className="space-y-6">
                                        {fields.map((field, index) => (
                                            <div key={field.id} className="p-6 rounded-2xl bg-gray-50/50 border border-gray-100 relative group animate-in fade-in slide-in-from-top-2">
                                                <button
                                                    type="button"
                                                    onClick={() => remove(index)}
                                                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                                
                                                <div className="space-y-4">
                                                    <div className="space-y-2">
                                                        <Label className="text-[10px] font-bold uppercase text-gray-400">Question {index + 1}</Label>
                                                        <Input
                                                            {...register(`questions.${index}.question` as const)}
                                                            className="h-11 rounded-xl bg-white border-gray-100"
                                                            placeholder="Enter question text..."
                                                        />
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {Array.from({ length: 4 }).map((_, optIndex) => (
                                                            <div key={optIndex} className="space-y-1 shadow-sm">
                                                                <div className="flex items-center gap-2">
                                                                    <div className={`size-6 rounded-full flex items-center justify-center text-[10px] font-bold ${field.correctAnswer === optIndex ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                                                                        {String.fromCharCode(65 + optIndex)}
                                                                    </div>
                                                                    <Input
                                                                        {...register(`questions.${index}.options.${optIndex}` as const)}
                                                                        className="h-10 rounded-xl bg-white border-gray-100 text-sm"
                                                                        placeholder={`Option ${optIndex + 1}`}
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="flex items-center gap-4">
                                                        <Label className="text-[10px] font-bold uppercase text-gray-400">Correct Answer:</Label>
                                                        <select
                                                            {...register(`questions.${index}.correctAnswer` as const)}
                                                            className="h-9 rounded-lg bg-white border border-gray-100 px-3 text-xs font-semibold text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                        >
                                                            {Array.from({ length: 4 }).map((_, i) => (
                                                                <option key={i} value={i}>Option {String.fromCharCode(65 + i)}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="p-8 border-t border-gray-100 flex items-center justify-end gap-3 flex-shrink-0">
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
