"use client"
import { useQuery } from "@tanstack/react-query"
import { getMembershipPlans } from "../api/membershipApi"

export const useMembershipPlans = () => {
    return useQuery({
        queryKey: ["membership-plans"],
        queryFn: getMembershipPlans,
        retry: false
    })
}
