export interface Result {
    _id: string;
    user: any;
    exam: any;
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    status: "pass" | "fail";
    createdAt: string;
}

export interface ResultsResponse {
    results: number;
    paginationResult: {
        currentPage: number;
        limit: number;
        numberOfPages: number;
    };
    data: Result[];
}

export interface ResultResponse {
    data: Result;
}
