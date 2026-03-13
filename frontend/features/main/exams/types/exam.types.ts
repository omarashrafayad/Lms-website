export interface Question {
    _id: string;
    question: string;
    options: string[];
    correctAnswer: number;
}

export interface Exam {
    _id: string;
    title: string;
    description: string;
    course: any;
    questions: Question[];
    duration: number; // in minutes
    createdAt: string;
    updatedAt: string;
}

export interface ExamsResponse {
    results: number;
    paginationResult: {
        currentPage: number;
        limit: number;
        numberOfPages: number;
    };
    data: Exam[];
}

export interface ExamResponse {
    data: Exam;
}
