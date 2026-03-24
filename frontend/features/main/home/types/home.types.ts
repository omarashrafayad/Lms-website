export interface HomeResponse {
  message: string;
  data: {
    newCourses: any[];
    trendingCourses: any[];
    stats?: {
      totalCourses: number;
      totalStudents: number;
      totalInstructors: number;
    }
  }
}
