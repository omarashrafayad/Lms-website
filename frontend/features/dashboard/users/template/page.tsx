"use client"

import { useUsers, useDeleteUser, useCreateUser, useUpdateUser } from "../hooks/useUsers"
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { getImageUrl } from "@/lib/image.utils"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { User } from "../types/user.types"
import { UserFormData, userFormSchema } from "../schemas/user.schema"

export default function UsersTemplate() {
    const [page, setPage] = useState(1)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [currentUser, setCurrentUser] = useState<User | null>(null)

    const { data: usersData, isLoading } = useUsers({ page, limit: 10 })
    const deleteMutation = useDeleteUser()
    const createUserMutation = useCreateUser()
    const updateUserMutation = useUpdateUser()

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors }
    } = useForm<UserFormData>({
        resolver: zodResolver(userFormSchema),
    })

    const handleEdit = (user: User) => {
        setIsEditing(true)
        setCurrentUser(user)
        reset({
            name: user.name,
            email: user.email,
            phone: user.phone || "",
            role: user.role,
            password: "",
        })
        setIsDialogOpen(true)
    }

    const handleOpenDialog = () => {
        setIsEditing(false)
        setCurrentUser(null)
        reset({
            name: "",
            email: "",
            phone: "",
            role: "student",
            password: "",
        })
        setIsDialogOpen(true)
    }

    const onSubmit = async (data: UserFormData) => {
        try {
            if (isEditing && currentUser) {
                const updateData: Partial<UserFormData> = { ...data }
                if (updateData.email === currentUser.email) {
                    delete updateData.email
                }
                if (!updateData.password) {
                    delete updateData.password
                    delete updateData.passwordConfirm
                }
                await updateUserMutation.mutateAsync({ userId: currentUser._id, data: updateData })
            } else {
                await createUserMutation.mutateAsync(data)
            }
            setIsDialogOpen(false)
            reset()
        } catch (error: any) {
            toast.error(error.response?.data?.message || "An error occurred")
        }
    }

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
                    value === "manager" ? "bg-purple-100 text-purple-700" :
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
                    <ActionButton icon={Pencil} onClick={() => handleEdit(row)} />
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
                <Button onClick={handleOpenDialog} className="rounded-xl flex gap-2 cursor-pointer shadow-lg shadow-primary/20 bg-primary text-white">
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

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-xl rounded-[2rem] p-0 border-none bg-white shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogHeader className="p-8 border-b border-gray-100">
                            <DialogTitle className="text-2xl font-bold text-gray-800">{isEditing ? "Update User" : "Create New User"}</DialogTitle>
                            <DialogDescription className="text-gray-500">
                                {isEditing ? "Update the details of the selected user." : "Add a new student, instructor, or admin."}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-gray-500">Full Name</Label>
                                    <Input id="name" {...register("name")} className="h-12 rounded-xl bg-gray-50 border-none" />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-gray-500">Email Address</Label>
                                    <Input id="email" type="email" {...register("email")} className="h-12 rounded-xl bg-gray-50 border-none" />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-gray-500">Phone</Label>
                                    <Input id="phone" {...register("phone")} className="h-12 rounded-xl bg-gray-50 border-none" />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="role" className="text-xs font-bold uppercase tracking-widest text-gray-500">Role</Label>
                                    <Select
                                        onValueChange={(val) => setValue("role", val as any)}
                                        value={watch("role")}
                                    >
                                        <SelectTrigger className="h-12 rounded-xl bg-gray-50 border-none shadow-none">
                                            <SelectValue placeholder="Select Role" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl shadow-xl border-none">
                                            <SelectItem value="student">Student</SelectItem>
                                            <SelectItem value="instructor">Instructor</SelectItem>
                                            <SelectItem value="manager">Manager</SelectItem>
                                            <SelectItem value="admin">Admin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="password" title={isEditing ? "Leave blank to keep current password" : "Enter password"} className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                    Password {isEditing && <span className="text-[10px] text-gray-400 font-normal normal-case">(Optional)</span>}
                                </Label>
                                <Input id="password" type="password" {...register("password")} className="h-12 rounded-xl bg-gray-50 border-none" />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="passwordConfirm" title={isEditing ? "Leave blank to keep current password" : "Enter password"} className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                    Password Confirm {isEditing && <span className="text-[10px] text-gray-400 font-normal normal-case">(Optional)</span>}
                                </Label>
                                <Input id="passwordConfirm" type="password" {...register("passwordConfirm")} className="h-12 rounded-xl bg-gray-50 border-none" />
                                {errors.passwordConfirm && <p className="text-red-500 text-xs mt-1">{errors.passwordConfirm.message}</p>}
                            </div>
                        </div>

                        <DialogFooter className="p-8 border-t border-gray-100 flex items-center justify-end gap-3">
                            <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl h-12 px-6">Cancel</Button>
                            <Button type="submit" disabled={createUserMutation.isPending || updateUserMutation.isPending} className="rounded-xl h-12 px-8 font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                                {createUserMutation.isPending || updateUserMutation.isPending ? <Loader2 className="animate-spin" /> : (isEditing ? "Save Changes" : "Create User")}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
