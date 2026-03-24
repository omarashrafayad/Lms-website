export interface User {
    _id: string;
    name: string;
    email: string;
    role: "student" | "instructor" | "admin" | "manager";
    active: boolean;
    phone?: string;
    profileImg?: string;
    createdAt: string;
}

export interface UsersResponse {
    results: number;
    paginationResult: {
        currentPage: number;
        limit: number;
        numberOfPages: number;
    };
    data: User[];
}
