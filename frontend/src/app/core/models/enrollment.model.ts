import { CourseResponse } from './course.model';

export interface EnrollmentRequest {
  studentId: number;
  courseId: number;
}

export interface EnrollmentResponse {
  id: number;
  studentId: number;
  course: CourseResponse;
  enrolledAt: string;
  completionDeadline: string;
  completedAt: string | null;
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
}
