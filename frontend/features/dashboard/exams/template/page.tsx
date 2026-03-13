"use client"

import { useAllExams, useDeleteExam } from "../hooks/useExams"
import UniTable, { ActionCell, ActionButton } from "@/components/shared/UniTable"
import { Trash2, Pencil, Plus, Loader2, Clock, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function ExamsTemplate() {
    const [page, setPage] = useState(1)
    const { data: examsData, isLoading } = useAllExams({ page, limit: 10 })
    const deleteMutation = useDeleteExam()

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
                    <ActionButton icon={Pencil} onClick={() => console.log("Edit", row._id)} />
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
                <Button className="rounded-xl flex gap-2 cursor-pointer shadow-lg shadow-primary/20 bg-primary text-white">
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
        </div>
    )
}
