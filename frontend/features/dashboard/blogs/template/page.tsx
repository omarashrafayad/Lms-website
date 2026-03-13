"use client"

import { useAllBlogs, useDeleteBlog } from "../hooks/useBlogs"
import UniTable, { ActionCell, ActionButton, ProductCell } from "@/components/shared/UniTable"
import { Trash2, Pencil, Plus, Loader2, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { getImageUrl } from "@/lib/image.utils"

export default function BlogsTemplate() {
    const [page, setPage] = useState(1)
    const { data: blogsData, isLoading } = useAllBlogs({ page, limit: 10 })
    const deleteMutation = useDeleteBlog()

    const columns = [
        {
            id: "blog",
            header: "Post",
            accessorKey: "title",
            cell: (value: any, row: any) => (
                <ProductCell
                    title={row.title}
                    subtitle={row.category?.name || "Uncategorized"}
                    image={getImageUrl(row.image, 'blogs')}
                />
            )
        },
        {
            id: "author",
            header: "Author",
            accessorKey: "user.name",
            cell: (value: any, row: any) => row.user?.name || "Admin"
        },
        {
            id: "createdAt",
            header: "Date",
            accessorKey: "createdAt",
            cell: (value: any) => (
                <div className="flex items-center gap-2 text-zinc-500 text-xs">
                    <Calendar size={12} />
                    <span>{new Date(value).toLocaleDateString()}</span>
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
                        if (confirm("Are you sure you want to delete this post?")) {
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
                    <h2 className="text-2xl font-bold tracking-tight">Blog Management</h2>
                    <p className="text-zinc-500">Publish news and educational articles.</p>
                </div>
                <Button className="rounded-xl flex gap-2 cursor-pointer shadow-lg shadow-primary/20 bg-primary text-white">
                    <Plus className="size-4" /> New Post
                </Button>
            </div>

            {isLoading ? (
                <div className="flex h-64 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
                <UniTable
                    data={blogsData?.data || []}
                    columns={columns}
                    enablePagination
                    pageSize={10}
                    serverPagination={{
                        currentPage: blogsData?.paginationResult.currentPage || 1,
                        totalPages: blogsData?.paginationResult.numberOfPages || 1,
                        totalItems: blogsData?.results || 0,
                        onPageChange: (p) => setPage(p)
                    }}
                />
            )}
        </div>
    )
}
