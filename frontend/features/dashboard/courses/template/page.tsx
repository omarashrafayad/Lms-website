"use client"

import { useAllCourses, useDeleteCourse, useCreateCourse, useUpdateCourse } from "../hooks/useCourses"
import { useAllCategories } from "../../categories/hooks/useCategories"
import { useUsers } from "../../users/hooks/useUsers"
import UniTable, { ActionCell, ActionButton, ProductCell } from "@/components/shared/UniTable"
import { Trash2, Pencil, Plus, Loader2, Users, Clock } from "lucide-react"
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
import { getImageUrl } from "@/lib/image.utils"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const courseSchema = z.object({
    title: z.string().min(3, "Too short course title"),
    description: z.string().min(20, "Too short description").optional(),
    price: z.coerce.number().min(0, "Price must be >= 0"),
    duration: z.string().optional(),
    totalHours: z.coerce.number().min(0, "Hours must be >= 0").optional(),
    instructor: z.string().nonempty("Instructor ID is required"),
    category: z.string().nonempty("Category ID is required"),
    level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'All Levels']).default('Beginner'),
    language: z.string().default('Arabic'),
    enrolledCount: z.coerce.number().min(0).optional(),
    whatYouWillLearn: z.string().optional(), // We'll convert this to array
    imageCover: z.any().optional(),
})

type CourseFormData = z.infer<typeof courseSchema>

export default function CoursesTemplate() {
    const [page, setPage] = useState(1)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [currentCourse, setCurrentCourse] = useState<any | null>(null)

    const { data: coursesData, isLoading } = useAllCourses({ page, limit: 10 })
    const { data: categoriesResponse } = useAllCategories({ limit: 100 })
    const { data: instructorsResponse } = useUsers({ role: "instructor", limit: 100 })

    const deleteMutation = useDeleteCourse()
    const createMutation = useCreateCourse()
    const updateMutation = useUpdateCourse()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(courseSchema) as any,
    })

    const handleEdit = (course: any) => {
        setIsEditing(true)
        setCurrentCourse(course)
        reset({
            title: course.title,
            description: course.description,
            price: course.price,
            instructor: course.instructor?._id || course.instructor,
            duration: course.duration,
            totalHours: course.totalHours || 0,
            category: course.category?._id || course.category,
            level: course.level || 'Beginner',
            language: course.language || 'Arabic',
            enrolledCount: course.enrolledCount || 0,
            whatYouWillLearn: course.whatYouWillLearn?.join('\n') || '',
        })
        setIsDialogOpen(true)
    }

    const handleOpenDialog = () => {
        setIsEditing(false)
        setCurrentCourse(null)
        reset({
            title: "",
            description: "",
            price: 0,
            instructor: "",
            duration: "",
            totalHours: 0,
            category: "",
            level: 'Beginner',
            language: 'Arabic',
            enrolledCount: 0,
            whatYouWillLearn: "",
        })
        setIsDialogOpen(true)
    }

    const onSubmit = async (data: any) => {
        try {
            const formData = new FormData()
            formData.append("title", data.title)
            formData.append("price", String(data.price))
            formData.append("instructor", data.instructor)
            formData.append("duration", String(data.duration || ""))
            formData.append("totalHours", String(data.totalHours || 0))
            formData.append("category", data.category)
            formData.append("level", data.level)
            formData.append("language", data.language)
            formData.append("enrolledCount", String(data.enrolledCount || 0))

            if (data.description) {
                formData.append("description", data.description)
            }

            // Handle whatYouWillLearn array
            if (data.whatYouWillLearn) {
                const outcomes = data.whatYouWillLearn.split('\n').filter((item: string) => item.trim() !== '')
                outcomes.forEach((outcome: string) => {
                    formData.append("whatYouWillLearn", outcome.trim())
                })
            }

            if (data.imageCover && data.imageCover.length > 0 && typeof data.imageCover !== 'string') {
                formData.append("imageCover", data.imageCover[0])
            }

            if (isEditing && currentCourse) {
                await updateMutation.mutateAsync({ id: currentCourse._id, data: formData })
            } else {
                await createMutation.mutateAsync(formData)
            }
            setIsDialogOpen(false)
            reset()
            toast.success(isEditing ? "Course updated successfully" : "Course created successfully")
        } catch (error: any) {
            toast.error(error.response?.data?.message || "An error occurred")
        }
    }

    const columns = [
        {
            id: "course",
            header: "Course",
            accessorKey: "title",
            cell: (value: any, row: any) => (
                <ProductCell
                    title={row.title}
                    subtitle={row.category?.name || "No Category"}
                    image={getImageUrl(row.imageCover, 'courses')}
                />
            )
        },
        {
            id: "instructor",
            header: "Instructor",
            accessorKey: "instructor.name",
            cell: (value: any, row: any) => row.instructor?.name || "System"
        },
        {
            id: "price",
            header: "Price",
            accessorKey: "price",
            cell: (value: any, row: any) => (
                <div className="flex flex-col text-xs md:text-sm">
                    <span className="font-bold text-zinc-900">${row.priceAfterDiscount || row.price}</span>
                    {row.priceAfterDiscount && <span className="text-[10px] text-zinc-400 line-through">${row.price}</span>}
                </div>
            )
        },
        {
            id: "students",
            header: "Students",
            accessorKey: "enrolledCount",
            cell: (value: any) => (
                <div className="flex items-center gap-2 text-zinc-500 font-bold">
                    <Users size={14} className="text-primary" />
                    <span>{value || 0}</span>
                </div>
            )
        },
        {
            id: "level",
            header: "Level",
            accessorKey: "level",
            cell: (value: any) => (
                <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-600">
                    {value || "Beginner"}
                </span>
            )
        },
        {
            id: "actions",
            header: "Actions",
            cell: (value: any, row: any) => (
                <ActionCell>
                    <ActionButton icon={Pencil} onClick={() => handleEdit(row)} />
                    <ActionButton icon={Trash2} variant="danger" onClick={() => {
                        if (confirm("Are you sure you want to delete this course?")) {
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
                    <h2 className="text-2xl font-bold tracking-tight">Courses Management</h2>
                    <p className="text-zinc-500">Manage your educational curriculum and instructors.</p>
                </div>
                <Button onClick={handleOpenDialog} className="rounded-xl flex gap-2 cursor-pointer shadow-lg shadow-primary/20 bg-primary text-white">
                    <Plus className="size-4" /> Add New Course
                </Button>
            </div>

            {isLoading ? (
                <div className="flex h-64 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
                <UniTable
                    data={coursesData?.data || []}
                    columns={columns}
                    enablePagination
                    pageSize={10}
                    serverPagination={{
                        currentPage: coursesData?.paginationResult.currentPage || 1,
                        totalPages: coursesData?.paginationResult.numberOfPages || 1,
                        totalItems: coursesData?.results || 0,
                        onPageChange: (p) => setPage(p)
                    }}
                />
            )}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-4xl rounded-[2rem] p-0 border-none bg-white shadow-2xl overflow-y-auto max-h-[95vh]">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogHeader className="p-8 border-b border-gray-100">
                            <DialogTitle className="text-2xl font-bold text-gray-800">{isEditing ? "Update Course" : "Create New Course"}</DialogTitle>
                            <DialogDescription className="text-gray-500">
                                {isEditing ? "Modify this course's curriculum details and settings." : "Add a new course curriculum to the platform."}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="p-8 space-y-8">
                            {/* Essential Info Section */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary/60 border-b border-gray-50 pb-2">Basic Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="title" className="text-xs font-bold uppercase tracking-widest text-gray-400">Course Title</Label>
                                        <Input id="title" {...register("title")} className="h-12 rounded-xl bg-gray-50 border-none px-4" placeholder="e.g. Graphic Design Masterclass" />
                                        {errors.title && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase">{String(errors.title.message)}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="price" className="text-xs font-bold uppercase tracking-widest text-gray-400">Course Price ($)</Label>
                                        <Input id="price" type="number" {...register("price")} className="h-12 rounded-xl bg-gray-50 border-none px-4" />
                                        {errors.price && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase">{String(errors.price.message)}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="category" className="text-xs font-bold uppercase tracking-widest text-gray-400">Category</Label>
                                        <select id="category" {...register("category")} className="flex h-12 w-full items-center justify-between rounded-xl bg-gray-50 border-none px-4 py-2 text-sm text-gray-700">
                                            <option value="">Select Category...</option>
                                            {categoriesResponse?.data?.map((cat: any) => (
                                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                                            ))}
                                        </select>
                                        {errors.category && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase">{String(errors.category.message)}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="instructor" className="text-xs font-bold uppercase tracking-widest text-gray-400">Instructor</Label>
                                        <select id="instructor" {...register("instructor")} className="flex h-12 w-full items-center justify-between rounded-xl bg-gray-50 border-none px-4 py-2 text-sm text-gray-700">
                                            <option value="">Select Instructor...</option>
                                            {instructorsResponse?.data?.map((user: any) => (
                                                <option key={user._id} value={user._id}>{user.name}</option>
                                            ))}
                                        </select>
                                        {errors.instructor && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase">{String(errors.instructor.message)}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Settings & Metadata Section */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary/60 border-b border-gray-50 pb-2">Technical Details & Metadata</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="level" className="text-xs font-bold uppercase tracking-widest text-gray-400">Level</Label>
                                        <select id="level" {...register("level")} className="flex h-12 w-full items-center justify-between rounded-xl bg-gray-50 border-none px-4 py-2 text-sm text-gray-700">
                                            <option value="Beginner">Beginner</option>
                                            <option value="Intermediate">Intermediate</option>
                                            <option value="Advanced">Advanced</option>
                                            <option value="All Levels">All Levels</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="language" className="text-xs font-bold uppercase tracking-widest text-gray-400">Language</Label>
                                        <Input id="language" {...register("language")} className="h-12 rounded-xl bg-gray-50 border-none px-4" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="enrolledCount" className="text-xs font-bold uppercase tracking-widest text-gray-400">Seed Students Count</Label>
                                        <Input id="enrolledCount" type="number" {...register("enrolledCount")} className="h-12 rounded-xl bg-gray-50 border-none px-4" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="duration" className="text-xs font-bold uppercase tracking-widest text-gray-400">Duration (approx string)</Label>
                                        <Input id="duration" {...register("duration")} className="h-12 rounded-xl bg-gray-50 border-none px-4" placeholder="e.g. 12 Weeks" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="totalHours" className="text-xs font-bold uppercase tracking-widest text-gray-400">Total Hours (number)</Label>
                                        <Input id="totalHours" type="number" {...register("totalHours")} className="h-12 rounded-xl bg-gray-50 border-none px-4" />
                                    </div>
                                </div>
                            </div>

                            {/* Rich Content Section */}
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary/60 border-b border-gray-50 pb-2">Content & Inclusions</h3>
                                    <div className="space-y-2">
                                        <Label htmlFor="description" className="text-xs font-bold uppercase tracking-widest text-gray-400">Detailed Description</Label>
                                        <textarea id="description" {...register("description")} rows={5} className="flex min-h-[120px] w-full rounded-xl bg-gray-50 border-none px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20" placeholder="Provide a deep overview of the course content..."></textarea>
                                        {errors.description && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase">{String(errors.description.message)}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="whatYouWillLearn" className="text-xs font-bold uppercase tracking-widest text-gray-400">Course Inclusions (One per line)</Label>
                                        <textarea id="whatYouWillLearn" {...register("whatYouWillLearn")} rows={5} className="flex min-h-[120px] w-full rounded-xl bg-gray-50 border-none px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20" placeholder="Full lifetime access&#10;Access on mobile and TV&#10;Certification of completion"></textarea>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="imageCover" className="text-xs font-bold uppercase tracking-widest text-gray-400">Course Banner (Cover)</Label>
                                    <div className="h-24 w-full rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center relative hover:bg-gray-100/50 transition-colors">
                                        <Input id="imageCover" type="file" accept="image/*" {...register("imageCover")} className="absolute inset-0 opacity-0 cursor-pointer" />
                                        <div className="flex flex-col items-center gap-1 text-gray-400">
                                            <Plus size={20} />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">Click to upload image</span>
                                        </div>
                                    </div>
                                    {errors.imageCover && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase">{String(errors.imageCover.message)}</p>}
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="p-8 border-t border-gray-100 flex items-center justify-end gap-4 bg-gray-50/50">
                            <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl h-12 px-8 font-bold text-gray-400 hover:text-gray-600">Cancel Action</Button>
                            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="rounded-xl h-12 px-10 font-bold bg-primary hover:bg-primary/90 text-white shadow-2xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95">
                                {createMutation.isPending || updateMutation.isPending ? <Loader2 className="animate-spin" /> : (isEditing ? "Update Curriculum" : "Publish Course")}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
