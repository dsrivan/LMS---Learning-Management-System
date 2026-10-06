import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

import { EnrollmentService } from '../../../core/services/enrollment.service';
import { EnrollmentRequest, EnrollmentResponse } from '../../../core/models/enrollment.model';
import { CourseService } from '../../../core/services/course.service';
import { CourseResponse } from '../../../core/models/course.model';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-catalog',
  imports: [],
  templateUrl: './catalog.html',
})
export class Catalog implements OnInit {
  private readonly courseService = inject(CourseService);
  private readonly enrollmentService = inject(EnrollmentService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  searchTerm = signal('');
  hasError = signal(false);
  loading = signal(true);
  enrolling = signal(false);

  studentId: number | null = this.authService.getUserId() ?? null;

  protected readonly isStudent = computed(() => this.authService.hasRole('STUDENT'));

  enrollmentStatus = signal<Record<number, EnrollmentResponse['status']>>({});
  activeEnrollmentCount = computed(
    () => Object.values(this.enrollmentStatus()).filter((status) => status === 'ACTIVE').length,
  );

  courseList = signal<CourseResponse[]>([]);
  filteredCourseList = computed(() => {
    const searchTerm = this.searchTerm().trim().toLocaleLowerCase();

    if (!searchTerm) {
      return this.courseList();
    }

    return this.courseList().filter(
      (course) =>
        course.name.toLocaleLowerCase().includes(searchTerm) ||
        course.description.toLocaleLowerCase().includes(searchTerm),
    );
  });

  ngOnInit(): void {
    this.loadCourses();
    this.loadEnrollments();
  }

  private loadEnrollments(): void {
    const studentId = this.authService.getUserId();

    if (!studentId) {
      return;
    }

    this.enrollmentService.getByStudent(studentId).subscribe({
      next: (enrollments) => {
        const statusMap = enrollments.reduce(
          (map, enrollment) => {
            map[enrollment.course.id] = enrollment.status;
            return map;
          },
          {} as Record<number, EnrollmentResponse['status']>,
        );

        this.enrollmentStatus.set(statusMap);
      },
    });
  }

  private loadCourses(): void {
    this.courseService.getAll().subscribe({
      next: (courses) => {
        this.hasError.set(false);
        this.courseList.set(courses);
        this.loading.set(false);
      },
      error: () => {
        this.hasError.set(true);
        this.loading.set(false);
      },
      complete: () => {},
    });
  }

  setSearchTerm(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  enrollCourse(courseId: number): void {
    const studentId = this.authService.getUserId();

    if (!studentId) {
      return;
    }

    const enrollmentRequest: EnrollmentRequest = {
      studentId,
      courseId,
    };

    this.enrolling.set(true);

    this.enrollmentService.create(enrollmentRequest).subscribe({
      next: (enrollment) => {
        this.hasError.set(false);
        this.enrolling.set(false);

        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.hasError.set(true);
        this.enrolling.set(false);
      },
      complete: () => {},
    });
  }

  getEnrollmentStatus(courseId: number): EnrollmentResponse['status'] | null {
    return this.enrollmentStatus()[courseId] ?? null;
  }

  canEnroll(courseId: number): boolean {
    const status = this.getEnrollmentStatus(courseId);

    if (status) {
      return false;
    }

    return this.activeEnrollmentCount() < 3;
  }

  getCourseStatusLabel(courseId: number): string {
    const status = this.getEnrollmentStatus(courseId);

    if (status === 'ACTIVE') {
      return 'Em andamento';
    }

    if (status === 'COMPLETED') {
      return 'Concluído';
    }

    if (status === 'CANCELLED') {
      return 'Indisponível';
    }

    return 'Disponível';
  }

  getCourseStatusClass(courseId: number): string {
    const status = this.getEnrollmentStatus(courseId);

    if (status === 'ACTIVE') {
      return 'bg-accent-soft text-accent';
    }

    if (status === 'COMPLETED') {
      return 'bg-bg text-muted';
    }

    if (status === 'CANCELLED') {
      return 'bg-bg text-muted';
    }

    return 'bg-ok-soft text-ok';
  }
}
