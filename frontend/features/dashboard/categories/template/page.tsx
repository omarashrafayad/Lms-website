"use client"

import { useAllCategories, useDeleteCategory, useCreateCategory, useUpdateCategory } from "../hooks/useCategories"
import UniTable, { ActionCell, ActionButton, ProductCell } from "@/components/shared/UniTable"
import { Trash2, Pencil, Plus, Loader2 } from "lucide-react"
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

const categorySchema = z.object({
    name: z.string().min(3, "Too short category name").max(32, "Too long category name"),
    // Just a placeholder since image upload is complex. The user can type string for now if it is not a file
    image: z.any().optional(),
})

type CategoryFormData = z.infer<typeof categorySchema>

export default function CategoriesTemplate() {
    const [page, setPage] = useState(1)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [currentCategory, setCurrentCategory] = useState<any | null>(null)

    const { data: categoriesData, isLoading } = useAllCategories({ page, limit: 10 })
    const deleteMutation = useDeleteCategory()
    const createMutation = useCreateCategory()
    const updateMutation = useUpdateCategory()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<CategoryFormData>({
        resolver: zodResolver(categorySchema),
    })

    const handleEdit = (category: any) => {
        setIsEditing(true)
        setCurrentCategory(category)
        reset({
            name: category.name,
            // Skip image or just set primitive value if any
        })
        setIsDialogOpen(true)
    }

    const handleOpenDialog = () => {
        setIsEditing(false)
        setCurrentCategory(null)
        reset({
            name: "",
        })
        setIsDialogOpen(true)
    }

    const onSubmit = async (data: any) => {
        try {
            const formData = new FormData()
            formData.append("name", data.name)
            
            if (data.image && data.image.length > 0 && typeof data.image !== 'string') {
                formData.append("image", data.image[0])
            }

            if (isEditing && currentCategory) {
                await updateMutation.mutateAsync({ id: currentCategory._id, data: formData })
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
                    <ActionButton icon={Pencil} onClick={() => handleEdit(row)} />
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
                <Button onClick={handleOpenDialog} className="rounded-xl flex gap-2 cursor-pointer shadow-lg shadow-primary/20 bg-primary text-white">
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

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-md rounded-[2rem] p-0 border-none bg-white shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogHeader className="p-8 border-b border-gray-100">
                            <DialogTitle className="text-2xl font-bold text-gray-800">{isEditing ? "Update Category" : "Create Category"}</DialogTitle>
                            <DialogDescription className="text-gray-500">
                                {isEditing ? "Modify the category details." : "Add a new category."}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="p-8 space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-gray-500">Category Name</Label>
                                <Input id="name" {...register("name")} className="h-12 rounded-xl bg-gray-50 border-none" />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{String(errors.name.message)}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="image" className="text-xs font-bold uppercase tracking-widest text-gray-500">Category Image (Upload File)</Label>
                                <Input id="image" type="file" accept="image/*" {...register("image")} className="h-12 rounded-xl bg-gray-50 border-none pt-2.5" />
                                {errors.image && <p className="text-red-500 text-xs mt-1">{String(errors.image.message)}</p>}
                            </div>
                        </div>

                        <DialogFooter className="p-8 border-t border-gray-100 flex items-center justify-end gap-3">
                            <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl h-12 px-6">Cancel</Button>
                            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="rounded-xl h-12 px-8 font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                                {createMutation.isPending || updateMutation.isPending ? <Loader2 className="animate-spin" /> : (isEditing ? "Save Changes" : "Create Category")}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
