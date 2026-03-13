"use client"

import { useAllPlans, useDeletePlan } from "../hooks/useMembership"
import UniTable, { ActionCell, ActionButton } from "@/components/shared/UniTable"
import { Trash2, Pencil, Plus, Loader2, CreditCard, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function MembershipTemplate() {
    const [page, setPage] = useState(1)
    const { data: plansData, isLoading } = useAllPlans({ page, limit: 10 })
    const deleteMutation = useDeletePlan()

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
                    <ActionButton icon={Pencil} onClick={() => console.log("Edit", row._id)} />
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
                <Button className="rounded-xl flex gap-2 cursor-pointer shadow-lg shadow-primary/20 bg-primary text-white">
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
        </div>
    )
}
