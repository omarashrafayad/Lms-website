export interface MembershipPlan {
    _id: string;
    name: string;
    description: string;
    price: number;
    period: "month" | "year" | "forever";
    features: string[];
    isPopular: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface MembershipPlansResponse {
    results: number;
    data: MembershipPlan[];
}
