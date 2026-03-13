"use client";

import {
    BarChart3,
    Users,
    ShoppingBag,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    CheckCircle2,
    BookOpen,
    Eye,
    DollarSign,
    Award,
    PenTool
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { motion } from "framer-motion";
import UniTable from "@/components/shared/UniTable";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import Link from "next/link";

const STATS = [
    {
        label: "Total Revenue",
        value: "$12,450.00",
        change: "+12.5%",
        trend: "up",
        icon: DollarSign,
        color: "text-emerald-600",
        bg: "bg-emerald-50"
    },
    {
        label: "Total Enrollments",
        value: "458",
        change: "+18.2%",
        trend: "up",
        icon: ShoppingBag,
        color: "text-blue-600",
        bg: "bg-blue-50"
    },
    {
        label: "Active Courses",
        value: "24",
        change: "+2",
        trend: "up",
        icon: BookOpen,
        color: "text-violet-600",
        bg: "bg-violet-50"
    },
    {
        label: "Active Students",
        value: "1,240",
        change: "+5.4%",
        trend: "up",
        icon: Users,
        color: "text-orange-600",
        bg: "bg-orange-50"
    },
];

const RECENT_ENROLLMENTS = [
    { id: "ENR-9012", student: "Ahmed Ali", course: "Advanced React Patterns", date: "5 mins ago", amount: "$49.00", status: "Paid" },
    { id: "ENR-9013", student: "Sara Smith", course: "UI/UX Design Masterclass", date: "12 mins ago", amount: "$89.00", status: "Paid" },
    { id: "ENR-9014", student: "John Doe", course: "Backend with Node.js", date: "24 mins ago", amount: "$55.00", status: "Pending" },
    { id: "ENR-9015", student: "Lina Hassan", course: "Digital Marketing 101", date: "1 hour ago", amount: "$32.00", status: "Paid" },
];

const COLUMNS = [
    { id: "id", header: "ID", accessorKey: "id", className: "font-mono font-medium text-primary" },
    { id: "student", header: "Student", accessorKey: "student", className: "font-medium" },
    { id: "course", header: "Course", accessorKey: "course" },
    { id: "date", header: "Date", accessorKey: "date", className: "text-zinc-500" },
    { id: "amount", header: "Amount", accessorKey: "amount", className: "font-semibold" },
    {
        id: "status",
        header: "Status",
        accessorKey: "status",
        cell: (value: any) => (
            <span className={cn(
                "px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider",
                value === "Paid" ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700"
            )}>
                {value}
            </span>
        )
    },
];

export default function AdminDashboard() {
    const { user } = useAuthStore();

    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Dashboard Overview</h2>
                <p className="text-zinc-500">Welcome back, {user?.name || "Admin"}! Here's the latest in your academy.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {STATS.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="border-none shadow-sm hover:shadow-md transition-shadow bg-white rounded-2xl overflow-hidden group">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={cn("p-3 rounded-xl transition-colors duration-300", stat.bg)}>
                                        <stat.icon className={cn("size-6", stat.color)} />
                                    </div>
                                    <div className={cn(
                                        "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
                                        stat.trend === "up" ? "text-emerald-600 bg-emerald-50" : "text-red-50"
                                    )}>
                                        {stat.trend === "up" ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                                        {stat.change}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-zinc-500 mb-1">{stat.label}</p>
                                    <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">{stat.value}</h3>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-7">
                {/* Main Chart Placeholder */}
                <Card className="lg:col-span-4 border-none shadow-sm bg-white rounded-3xl p-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
                        <div>
                            <CardTitle className="text-xl font-bold mb-1">Learning Activity</CardTitle>
                            <CardDescription>Track student engagement across courses</CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="rounded-xl px-4 h-9 cursor-pointer">Daily</Button>
                            <Button size="sm" className="rounded-xl px-4 h-9 cursor-pointer bg-primary text-white">Weekly</Button>
                        </div>
                    </div>

                    <div className="h-[300px] w-full bg-linear-to-b from-zinc-50 to-transparent rounded-3xl border border-dashed border-zinc-200 flex items-center justify-center relative overflow-hidden group">
                        <div className="flex items-end gap-4 h-1/2">
                            {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ delay: 0.5 + (i * 0.1), duration: 1, ease: "easeOut" }}
                                    className="w-8 bg-primary/20 hover:bg-primary/40 rounded-t-lg transition-colors relative group"
                                />
                            ))}
                        </div>
                        <p className="absolute bottom-6 text-xs text-zinc-400 font-medium">Activity Trends Visual</p>
                    </div>
                </Card>

                {/* Sidebar Activity */}
                <Card className="lg:col-span-3 border-none shadow-sm bg-white rounded-3xl p-8 overflow-hidden">
                    <CardHeader className="p-0 mb-6">
                        <CardTitle className="text-xl font-bold">Recent Updates</CardTitle>
                        <CardDescription>Academy news and latest actions</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="space-y-6">
                            {[
                                { icon: ShoppingBag, title: "New Enrollment", time: "2 mins ago", desc: "Ahmed Ali joined React Patterns", color: "text-blue-500", bg: "bg-blue-50" },
                                { icon: PenTool, title: "Exam Submitted", time: "15 mins ago", desc: "Sara Smith finished UI/UX Quiz", color: "text-violet-500", bg: "bg-violet-50" },
                                { icon: Award, title: "Certificate Issued", time: "1 hour ago", desc: "Lina Hassan completed Node.js Course", color: "text-emerald-500", bg: "bg-emerald-50" },
                                { icon: Users, title: "New Student", time: "3 hours ago", desc: "John Doe registered an account", color: "text-orange-500", bg: "bg-orange-50" },
                            ].map((activity, i) => (
                                <div key={i} className="flex gap-4 relative">
                                    {i !== 3 && <div className="absolute left-5 top-10 bottom-0 w-px bg-zinc-100" />}
                                    <div className={cn("size-10 rounded-xl flex items-center justify-center shrink-0 z-10", activity.bg)}>
                                        <activity.icon size={18} className={activity.color} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-zinc-900">{activity.title}</h4>
                                        <p className="text-xs text-zinc-500 mt-0.5">{activity.desc}</p>
                                        <span className="text-[10px] text-zinc-400 font-medium mt-1 inline-block uppercase tracking-wider">{activity.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link href="/dashboard/orders">
                            <Button variant="outline" className="w-full mt-8 rounded-xl border-zinc-200 font-semibold cursor-pointer">View All Activities</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Table */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-bold tracking-tight">Recent Enrollments</h3>
                        <p className="text-zinc-500">Quick view of latest student registrations</p>
                    </div>
                    <Link href="/dashboard/orders">
                        <Button size="sm" variant="outline" className="rounded-xl px-4 flex gap-2 cursor-pointer border-zinc-200 h-10">
                            <Eye className="size-4" /> View All
                        </Button>
                    </Link>
                </div>

                <UniTable
                    data={RECENT_ENROLLMENTS}
                    columns={COLUMNS}
                    className="rounded-3xl border border-zinc-100 shadow-sm overflow-hidden"
                />
            </div>
        </div>
    );
}
