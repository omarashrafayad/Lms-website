export interface Lesson {
    _id: string;
    title: string;
    description?: string;
    videoUrl?: string;
    duration?: string;
    course: any; // populated course object or ID
    order: number;
    createdAt: string;
    updatedAt: string;
}

export interface LessonsResponse {
    results: number;
    paginationResult: {
        currentPage: number;
        limit: number;
        numberOfPages: number;
    };
    data: Lesson[];
}

export interface LessonResponse {
    data: Lesson;
}
