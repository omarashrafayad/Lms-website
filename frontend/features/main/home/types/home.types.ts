export interface HomeResponse {
  message: string;
  data: {
    categories: any[];
    newCourses: any[];
    trendingCourses: any[];
    stats?: {
      totalCourses: number;
      totalStudents: number;
      totalInstructors: number;
    }
  }
}
