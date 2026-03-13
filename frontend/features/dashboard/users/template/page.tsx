"use client"

import { useUsers, useDeleteUser } from "../hooks/useUsers"
import UniTable, { ActionCell, ActionButton, ProductCell } from "@/components/shared/UniTable"
import { Trash2, Pencil, Plus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function UsersTemplate() {
    const [page, setPage] = useState(1)
    const { data: usersData, isLoading } = useUsers({ page, limit: 10 })
    const deleteMutation = useDeleteUser()

    const columns = [
        {
            id: "user",
            header: "User",
            accessorKey: "name",
            cell: (value: any, row: any) => (
                <ProductCell
                    title={row.name}
                    subtitle={row.email}
                    image={row.profileImg}
                />
            )
        },
        {
            id: "role",
            header: "Role",
            accessorKey: "role",
            cell: (value: any) => (
                <span className={cn(
                    "px-2 py-1 rounded-lg text-xs font-bold uppercase",
                    value === "admin" ? "bg-red-100 text-red-700" :
                    value === "instructor" ? "bg-blue-100 text-blue-700" :
                    "bg-gray-100 text-gray-700"
                )}>
                    {value}
                </span>
            )
        },
        {
            id: "createdAt",
            header: "Joined Date",
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
                        if (confirm("Are you sure you want to delete this user?")) {
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
                    <h2 className="text-2xl font-bold tracking-tight">Users Management</h2>
                    <p className="text-gray-500">Manage your students and instructors.</p>
                </div>
                <Button className="rounded-xl flex gap-2 cursor-pointer shadow-lg shadow-primary/20 bg-primary text-white">
                    <Plus className="size-4" /> Add New User
                </Button>
            </div>

            {isLoading ? (
                <div className="flex h-64 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
                <UniTable
                    data={usersData?.data || []}
                    columns={columns}
                    enablePagination
                    pageSize={10}
                    serverPagination={{
                        currentPage: usersData?.paginationResult.currentPage || 1,
                        totalPages: usersData?.paginationResult.numberOfPages || 1,
                        totalItems: usersData?.results || 0,
                        onPageChange: (p) => setPage(p)
                    }}
                />
            )}
        </div>
    )
}

// Add cn helper import if not present
import { cn } from "@/lib/utils"
