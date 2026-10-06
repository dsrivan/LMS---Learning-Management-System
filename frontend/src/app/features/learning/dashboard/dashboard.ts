import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EnrollmentService } from '../../../core/services/enrollment.service';
import { EnrollmentResponse } from '../../../core/models/enrollment.model';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../core/auth/auth.service';

interface Course {
  id: number;
  title: string;
  description: string;
  enrollmentDate?: string;
  conclusionDate?: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [DatePipe, RouterLink],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly enrollmentService = inject(EnrollmentService);
  private readonly authService = inject(AuthService);

  hasError = signal(false);
  loading = signal(true);

  studentId: number | null = this.authService.getUserId() ?? null;

  enrollmentList = signal<EnrollmentResponse[]>([]);
  activeEnrollmentList = signal<EnrollmentResponse[] | null>(null);
  conpletedEnrollmentList = signal<EnrollmentResponse[] | null>(null);

  private loadEnrollments(): void {
    const studentId = this.authService.getUserId();

    if (!studentId) {
      this.hasError.set(true);
      this.loading.set(false);
      return;
    }

    this.enrollmentService.getByStudent(studentId).subscribe({
      next: (enrollments) => {
        this.hasError.set(false);

        this.enrollmentList.set(enrollments);

        this.filterActiveEnrollment();

        this.loading.set(false);
      },
      error: () => {
        this.hasError.set(true);
        this.loading.set(false);
      },
      complete: () => {},
    });
  }

  private filterActiveEnrollment(): void {
    const enrollments = this.enrollmentList();

    this.activeEnrollmentList.set(enrollments.filter((e) => e.status === 'ACTIVE'));
    this.conpletedEnrollmentList.set(enrollments.filter((e) => e.status === 'COMPLETED'));
  }

  calculateRemainingPercentage(enrolledAt: string, completionDeadline: string): string {
    const start = new Date(enrolledAt).getTime();
    const end = new Date(`${completionDeadline}T23:59:59`).getTime();
    const now = Date.now();

    const total = end - start;
    const remaining = end - now;

    if (total <= 0) {
      return '0%';
    }

    const percentage = Math.min(100, Math.max(0, (remaining / total) * 100));

    return `${Math.round(percentage)}%`;
  }

  ngOnInit(): void {
    this.enrollmentList.set([]);
    this.activeEnrollmentList.set(null);
    this.conpletedEnrollmentList.set(null);

    this.loadEnrollments();
  }
}
