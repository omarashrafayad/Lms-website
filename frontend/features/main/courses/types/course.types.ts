export interface Course {
    _id: string;
    title: string;
    description: string;
    description_ar: string;
    price: number;
    priceAfterDiscount?: number;
    imageCover: string;
    images?: string[];
    category: any;
    subCategory?: any[];
    ratingsAverage?: number;
    ratingsQuantity?: number;
    instructor?: any;
    createdAt: string;
    updatedAt: string;
}

export interface CoursesResponse {
    results: number;
    paginationResult: {
        currentPage: number;
        limit: number;
        numberOfPages: number;
    };
    data: Course[];
}

export interface CourseResponse {
    data: Course;
}
