export interface Blog {
    _id: string;
    title: string;
    description: string;
    content: string;
    imageCover: string;
    category: any;
    author: string;
    createdAt: string;
    updatedAt: string;
}

export interface BlogsResponse {
    results: number;
    paginationResult: {
        currentPage: number;
        limit: number;
        numberOfPages: number;
    };
    data: Blog[];
}

export interface BlogResponse {
    data: Blog;
}
