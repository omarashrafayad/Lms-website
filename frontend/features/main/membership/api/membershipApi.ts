import clientAxios from "@/lib/axios/clientAxios";
import { MembershipPlansResponse } from "../types/membership.types";

export const getMembershipPlans = async (): Promise<MembershipPlansResponse> => {
    const res = await clientAxios.get("membership-plans");
    return res.data;
};
