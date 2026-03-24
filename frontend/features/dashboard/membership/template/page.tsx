"use client"

import { useAllPlans, useDeletePlan, useCreatePlan, useUpdatePlan } from "../hooks/useMembership"
import UniTable, { ActionCell, ActionButton } from "@/components/shared/UniTable"
import { Trash2, Pencil, Plus, Loader2, CreditCard } from "lucide-react"
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
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"

const planSchema = z.object({
    name: z.string().min(3, "Too short plan name"),
    description: z.string().min(5, "Too short plan description"),
    price: z.coerce.number().min(0, "Price must be >= 0"),
    period: z.enum(["month", "year", "forever"]),
    isPopular: z.boolean().default(false),
})

export default function MembershipTemplate() {
    const [page, setPage] = useState(1)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [currentPlan, setCurrentPlan] = useState<any | null>(null)

    const { data: plansData, isLoading } = useAllPlans({ page, limit: 10 })
    const deleteMutation = useDeletePlan()
    const createMutation = useCreatePlan()
    const updateMutation = useUpdatePlan()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(planSchema) as any,
    })

    const handleEdit = (plan: any) => {
        setIsEditing(true)
        setCurrentPlan(plan)
        reset({
            name: plan.name,
            description: plan.description,
            price: plan.price,
            period: plan.period,
            isPopular: plan.isPopular,
        })
        setIsDialogOpen(true)
    }

    const handleOpenDialog = () => {
        setIsEditing(false)
        setCurrentPlan(null)
        reset({
            name: "",
            description: "",
            price: 0,
            period: "month",
            isPopular: false,
        })
        setIsDialogOpen(true)
    }

    const onSubmit = async (data: any) => {
        try {
            // Because checkbox gives us a string array sometimes or similar in raw forms, but boolean is better handled manually if needed. Wait z.coerce will handle it ideally or we format it.
            // Converting explicitly to boolean just in case
            data.isPopular = data.isPopular === true || data.isPopular === "true" || data.isPopular === "on";

            if (isEditing && currentPlan) {
                await updateMutation.mutateAsync({ id: currentPlan._id, data })
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
            id: "plan",
            header: "Plan Name",
            accessorKey: "name",
            cell: (value: any, row: any) => (
                <div className="flex items-center gap-3">
                    <div className={cn("size-8 rounded-lg flex items-center justify-center", row.isPopular ? "bg-primary/10 text-primary" : "bg-zinc-100 text-zinc-400")}>
                        <CreditCard size={18} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-zinc-800">{row.name}</span>
                        {row.isPopular && <span className="text-[10px] text-primary font-bold uppercase tracking-widest">Popular</span>}
                    </div>
                </div>
            )
        },
        {
            id: "price",
            header: "Price",
            accessorKey: "price",
            cell: (value: any, row: any) => (
                <div className="font-bold text-zinc-900">
                    ${value} <span className="text-zinc-400 text-[10px] font-normal lowercase">/ {row.period}</span>
                </div>
            )
        },
        {
            id: "features",
            header: "Features",
            accessorKey: "features",
            cell: (value: any) => (
                <div className="text-xs text-zinc-500">
                    {value?.length || 0} Features included
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
                        if (confirm("Are you sure you want to delete this plan?")) {
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
                    <h2 className="text-2xl font-bold tracking-tight">Membership Management</h2>
                    <p className="text-zinc-500">Manage subscription plans and pricing levels.</p>
                </div>
                <Button onClick={handleOpenDialog} className="rounded-xl flex gap-2 cursor-pointer shadow-lg shadow-primary/20 bg-primary text-white">
                    <Plus className="size-4" /> Create New Plan
                </Button>
            </div>

            {isLoading ? (
                <div className="flex h-64 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
                <UniTable
                    data={plansData?.data || []}
                    columns={columns}
                />
            )}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-md rounded-[2rem] p-0 border-none bg-white shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogHeader className="p-8 border-b border-gray-100">
                            <DialogTitle className="text-2xl font-bold text-gray-800">{isEditing ? "Update Plan" : "Create New Plan"}</DialogTitle>
                            <DialogDescription className="text-gray-500">
                                {isEditing ? "Modify this membership plan's details." : "Create a new pricing tier for students."}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="p-8 space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-gray-500">Plan Name</Label>
                                <Input id="name" {...register("name")} className="h-12 rounded-xl bg-gray-50 border-none" />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{String(errors.name.message)}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-xs font-bold uppercase tracking-widest text-gray-500">Description</Label>
                                <Input id="description" {...register("description")} className="h-12 rounded-xl bg-gray-50 border-none" />
                                {errors.description && <p className="text-red-500 text-xs mt-1">{String(errors.description.message)}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="price" className="text-xs font-bold uppercase tracking-widest text-gray-500">Price ($)</Label>
                                    <Input id="price" type="number" {...register("price")} className="h-12 rounded-xl bg-gray-50 border-none" />
                                    {errors.price && <p className="text-red-500 text-xs mt-1">{String(errors.price.message)}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="period" className="text-xs font-bold uppercase tracking-widest text-gray-500">Period</Label>
                                    <select id="period" {...register("period")} className="flex h-12 w-full items-center justify-between rounded-xl bg-gray-50 border-none px-3 py-2 text-sm">
                                        <option value="month">Monthly</option>
                                        <option value="year">Yearly</option>
                                        <option value="forever">Lifetime</option>
                                    </select>
                                    {errors.period && <p className="text-red-500 text-xs mt-1">{String(errors.period.message)}</p>}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 pt-2">
                                <Input id="isPopular" type="checkbox" {...register("isPopular")} className="size-5 rounded text-primary" />
                                <Label htmlFor="isPopular" className="font-medium text-gray-700">Mark as Popular Plan</Label>
                                {errors.isPopular && <p className="text-red-500 text-xs mt-1">{String(errors.isPopular.message)}</p>}
                            </div>
                        </div>

                        <DialogFooter className="p-8 border-t border-gray-100 flex items-center justify-end gap-3">
                            <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl h-12 px-6">Cancel</Button>
                            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="rounded-xl h-12 px-8 font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                                {createMutation.isPending || updateMutation.isPending ? <Loader2 className="animate-spin" /> : (isEditing ? "Save Changes" : "Create Plan")}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
