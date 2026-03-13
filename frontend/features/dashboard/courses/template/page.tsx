"use client"

import { useAllCourses, useDeleteCourse } from "../hooks/useCourses"
import UniTable, { ActionCell, ActionButton, ProductCell } from "@/components/shared/UniTable"
import { Trash2, Pencil, Plus, Loader2, Users, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { getImageUrl } from "@/lib/image.utils"

export default function CoursesTemplate() {
    const [page, setPage] = useState(1)
    const { data: coursesData, isLoading } = useAllCourses({ page, limit: 10 })
    const deleteMutation = useDeleteCourse()

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
                <div className="flex flex-col">
                    <span className="font-bold text-zinc-900">${row.priceAfterDiscount || row.price}</span>
                    {row.priceAfterDiscount && <span className="text-[10px] text-zinc-400 line-through">${row.price}</span>}
                </div>
            )
        },
        {
            id: "students",
            header: "Students",
            accessorKey: "sold",
            cell: (value: any) => (
                <div className="flex items-center gap-2 text-zinc-500">
                    <Users size={14} />
                    <span>{value || 0}</span>
                </div>
            )
        },
        {
            id: "actions",
            header: "Actions",
            cell: (value: any, row: any) => (
                <ActionCell>
                    <ActionButton icon={Pencil} onClick={() => console.log("Edit", row._id)} />
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
                <Button className="rounded-xl flex gap-2 cursor-pointer shadow-lg shadow-primary/20 bg-primary text-white">
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
        </div>
    )
}
