"use client"

import { useAllOrders, useUpdateOrderStatus } from "../hooks/useOrders"
import UniTable, { ActionCell, ActionButton } from "@/components/shared/UniTable"
import { ShoppingBag, Eye, CheckCircle, Clock, Loader2 } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function OrdersTemplate() {
    const [page, setPage] = useState(1)
    const { data: ordersData, isLoading } = useAllOrders({ page, limit: 10 })
    const updateMutation = useUpdateOrderStatus()

    const columns = [
        {
            id: "order",
            header: "Order ID",
            accessorKey: "_id",
            cell: (value: any) => <span className="text-xs font-mono text-zinc-500">#{value.slice(-6).toUpperCase()}</span>
        },
        {
            id: "user",
            header: "Student",
            accessorKey: "user.name",
            cell: (value: any, row: any) => (
                <div className="flex flex-col">
                    <span className="font-bold text-zinc-800">{row.user?.name}</span>
                    <span className="text-[10px] text-zinc-400">{row.user?.email}</span>
                </div>
            )
        },
        {
            id: "total",
            header: "Total Price",
            accessorKey: "totalOrderPrice",
            cell: (value: any) => <span className="font-bold">${value}</span>
        },
        {
            id: "status",
            header: "Status",
            cell: (value: any, row: any) => (
                <span className={cn(
                    "px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                    row.isPaid ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                )}>
                    {row.isPaid ? "Paid" : "Pending"}
                </span>
            )
        },
        {
            id: "date",
            header: "Order Date",
            accessorKey: "createdAt",
            cell: (value: any) => new Date(value).toLocaleDateString()
        },
        {
            id: "actions",
            header: "Actions",
            cell: (value: any, row: any) => (
                <ActionCell>
                    <ActionButton icon={Eye} onClick={() => console.log("View Order", row._id)} />
                    {!row.isPaid && (
                        <ActionButton 
                            icon={CheckCircle} 
                            variant="primary" 
                            onClick={() => updateMutation.mutate({ id: row._id, status: "paid" })} 
                        />
                    )}
                </ActionCell>
            )
        }
    ]

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Orders & Enrollments</h2>
                <p className="text-zinc-500">Track all purchases and course registrations.</p>
            </div>

            {isLoading ? (
                <div className="flex h-64 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
                <UniTable
                    data={ordersData?.data || []}
                    columns={columns}
                    enablePagination
                    pageSize={10}
                    serverPagination={{
                        currentPage: ordersData?.paginationResult?.currentPage || 1,
                        totalPages: ordersData?.paginationResult?.numberOfPages || 1,
                        totalItems: ordersData?.results || 0,
                        onPageChange: (p) => setPage(p)
                    }}
                />
            )}
        </div>
    )
}
