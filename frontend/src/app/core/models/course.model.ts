export interface CourseRequest {
  name: string; // max 50
  description: string; // max 10000
}

export interface CourseResponse {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
