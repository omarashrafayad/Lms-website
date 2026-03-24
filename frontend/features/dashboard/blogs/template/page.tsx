"use client"

import { useAllBlogs, useDeleteBlog, useCreateBlog, useUpdateBlog } from "../hooks/useBlogs"
import { useAllCategories } from "../../categories/hooks/useCategories"
import UniTable, { ActionCell, ActionButton, ProductCell } from "@/components/shared/UniTable"
import { Trash2, Pencil, Plus, Loader2, Calendar } from "lucide-react"
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
import { useUsers } from "../../users/hooks/useUsers"

const blogSchema = z.object({
    title: z.string().min(5, "Too short blog title"),
    content: z.string().min(10, "Too short description"),
    category: z.string().nonempty("Category is required"),
    author: z.string().nonempty("Author is required"),
    imageCover: z.any().optional(),
})

type BlogFormData = z.infer<typeof blogSchema>

export default function BlogsTemplate() {
    const [page, setPage] = useState(1)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [currentBlog, setCurrentBlog] = useState<any | null>(null)

    const { data: blogsData, isLoading } = useAllBlogs({ page, limit: 10 })
    const { data: categoriesResponse } = useAllCategories({ limit: 100 })
    const { data: usersResponse } = useUsers({ limit: 100 })
    
    const deleteMutation = useDeleteBlog()
    const createMutation = useCreateBlog()
    const updateMutation = useUpdateBlog()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(blogSchema) as any,
    })

    const handleEdit = (blog: any) => {
        setIsEditing(true)
        setCurrentBlog(blog)
        reset({
            title: blog.title,
            content: blog.content,
            category: blog.category?._id || blog.category,
            author: blog.author?._id || blog.author,
        })
        setIsDialogOpen(true)
    }

    const handleOpenDialog = () => {
        setIsEditing(false)
        setCurrentBlog(null)
        reset({
            title: "",
            content: "",
            category: "",
            author: "",
        })
        setIsDialogOpen(true)
    }

    const onSubmit = async (data: any) => {
        try {
            const formData = new FormData()
            formData.append("title", data.title)
            formData.append("category", data.category)
            formData.append("author", data.author)
            formData.append("content", data.content)
            if (data.imageCover && data.imageCover.length > 0 && typeof data.imageCover !== 'string') {
                formData.append("imageCover", data.imageCover[0])
            }

            if (isEditing && currentBlog) {
                await updateMutation.mutateAsync({ id: currentBlog._id, data: formData })
            } else {
                await createMutation.mutateAsync(formData)
            }
            setIsDialogOpen(false)
            reset()
        } catch (error: any) {
            toast.error(error.response?.data?.message || "An error occurred")
        }
    }

    const columns = [
        {
            id: "blog",
            header: "Post",
            accessorKey: "title",
            cell: (value: any, row: any) => (
                <ProductCell
                    title={row.title}
                    subtitle={row.category?.name || "Uncategorized"}
                    image={getImageUrl(row.imageCover, 'blogs')}
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
                    <ActionButton icon={Pencil} onClick={() => handleEdit(row)} />
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
                <Button onClick={handleOpenDialog} className="rounded-xl flex gap-2 cursor-pointer shadow-lg shadow-primary/20 bg-primary text-white">
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

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl rounded-[2rem] p-0 border-none bg-white shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogHeader className="p-8 border-b border-gray-100">
                            <DialogTitle className="text-2xl font-bold text-gray-800">{isEditing ? "Update Post" : "Create New Post"}</DialogTitle>
                            <DialogDescription className="text-gray-500">
                                {isEditing ? "Edit this blog post details." : "Publish a new blog or news article."}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="p-8 space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-xs font-bold uppercase tracking-widest text-gray-500">Post Title</Label>
                                <Input id="title" {...register("title")} className="h-12 rounded-xl bg-gray-50 border-none" />
                                {errors.title && <p className="text-red-500 text-xs mt-1">{String(errors.title.message)}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category" className="text-xs font-bold uppercase tracking-widest text-gray-500">Category</Label>
                                <select id="category" {...register("category")} className="flex h-12 w-full items-center justify-between rounded-xl bg-gray-50 border-none px-3 py-2 text-sm text-gray-700">
                                    <option value="">Select Category...</option>
                                    {categoriesResponse?.data?.map((cat: any) => (
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    ))}
                                </select>
                                {errors.category && <p className="text-red-500 text-xs mt-1">{String(errors.category.message)}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="author" className="text-xs font-bold uppercase tracking-widest text-gray-500">Author</Label>
                                <select id="author" {...register("author")} className="flex h-12 w-full items-center justify-between rounded-xl bg-gray-50 border-none px-3 py-2 text-sm text-gray-700">
                                    <option value="">Select Author...</option>
                                    {usersResponse?.data?.map((user: any) => (
                                        <option key={user._id} value={user._id}>{user.name}</option>
                                    ))}
                                </select>
                                {errors.author && <p className="text-red-500 text-xs mt-1">{String(errors.author.message)}</p>}
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="content" className="text-xs font-bold uppercase tracking-widest text-gray-500">Content</Label>
                                <Input id="content" {...register("content")} className="h-12 rounded-xl bg-gray-50 border-none" />
                                {errors.content && <p className="text-red-500 text-xs mt-1">{String(errors.content.message)}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="imageCover" className="text-xs font-bold uppercase tracking-widest text-gray-500">Cover Image (Upload File)</Label>
                                <Input id="imageCover" type="file" accept="image/*" {...register("imageCover")} className="h-12 rounded-xl bg-gray-50 border-none pt-2.5" />
                                {errors.imageCover && <p className="text-red-500 text-xs mt-1">{String(errors.imageCover.message)}</p>}
                            </div>
                        </div>

                        <DialogFooter className="p-8 border-t border-gray-100 flex items-center justify-end gap-3">
                            <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl h-12 px-6">Cancel</Button>
                            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="rounded-xl h-12 px-8 font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                                {createMutation.isPending || updateMutation.isPending ? <Loader2 className="animate-spin" /> : (isEditing ? "Save Changes" : "Create Post")}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
