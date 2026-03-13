"use client"

import { useAllCategories, useDeleteCategory } from "../hooks/useCategories"
import UniTable, { ActionCell, ActionButton, ProductCell } from "@/components/shared/UniTable"
import { Trash2, Pencil, Plus, Loader2, FolderTree } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { getImageUrl } from "@/lib/image.utils"

export default function CategoriesTemplate() {
    const [page, setPage] = useState(1)
    const { data: categoriesData, isLoading } = useAllCategories({ page, limit: 10 })
    const deleteMutation = useDeleteCategory()

    const columns = [
        {
            id: "category",
            header: "Category",
            accessorKey: "name",
            cell: (value: any, row: any) => (
                <ProductCell
                    title={row.name}
                    subtitle={row.slug}
                    image={getImageUrl(row.image, 'categories')}
                />
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
                        if (confirm("Are you sure you want to delete this category?")) {
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
                    <h2 className="text-2xl font-bold tracking-tight">Categories Management</h2>
                    <p className="text-zinc-500">Organize your courses into logical groups.</p>
                </div>
                <Button className="rounded-xl flex gap-2 cursor-pointer shadow-lg shadow-primary/20 bg-primary text-white">
                    <Plus className="size-4" /> Add New Category
                </Button>
            </div>

            {isLoading ? (
                <div className="flex h-64 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
                <UniTable
                    data={categoriesData?.data || []}
                    columns={columns}
                    enablePagination
                    pageSize={10}
                    serverPagination={{
                        currentPage: categoriesData?.paginationResult.currentPage || 1,
                        totalPages: categoriesData?.paginationResult.numberOfPages || 1,
                        totalItems: categoriesData?.results || 0,
                        onPageChange: (p) => setPage(p)
                    }}
                />
            )}
        </div>
    )
}
