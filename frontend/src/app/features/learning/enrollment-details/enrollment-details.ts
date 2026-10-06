import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EnrollmentResponse } from '../../../core/models/enrollment.model';
import { DatePipe } from '@angular/common';
import { EnrollmentService } from '../../../core/services/enrollment.service';
import { TaskLogService } from '../../../core/services/task-log.service';
import { TaskCategory } from '../../../core/models/task-log.model';

interface Task {
  id: number;
  category: string;
  description: string;
  timeSpent: string;
  date: string;
}

@Component({
  selector: 'app-course-details',
  imports: [DatePipe, RouterLink],
  templateUrl: './enrollment-details.html',
})
export class CourseDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly taskLogService = inject(TaskLogService);

  private readonly enrollmentService = inject(EnrollmentService);

  hasError = signal(false);
  loading = signal(true);
  deleteLoading = signal(false);

  readonly enrollmentId = this.route.snapshot.paramMap.get('id') || null;

  enrollment = signal<EnrollmentResponse | null>(null);

  taskList = signal<Task[] | null>(null);

  ngOnInit(): void {
    this.loadEnrollment();
    this.loadTasks();
  }

  private loadEnrollment(): void {
    if (!this.enrollmentId) {
      this.hasError.set(true);
      this.loading.set(false);
      return;
    }

    this.enrollmentService.getById(Number(this.enrollmentId)).subscribe({
      next: (enrollment) => {
        this.hasError.set(false);

        this.enrollment.set(enrollment);

        this.loading.set(false);

        console.clear();
      },
      error: () => {
        this.hasError.set(true);
        this.loading.set(false);
      },
      complete: () => {},
    });
  }

  completeEnrollment(id: number | null): void {
    if (!id) {
      return;
    }

    this.enrollmentService.complete(id).subscribe({
      next: (enrollment) => {
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        console.error('Error completing enrollment');
      },
    });
  }

  private loadTasks(): void {
    this.taskLogService.getByEnrollment(Number(this.enrollmentId)).subscribe({
      next: (tasks) => {
        this.hasError.set(false);

        this.taskList.set(
          tasks.map((task) => ({
            id: task.id,
            category: this.categoryLabels[task.category],
            description: task.description,
            timeSpent: this.calculateTimeSpent(task.startedAt, task.endedAt),
            date: new Date(task.startedAt).toLocaleDateString(),
          })),
        );
      },
      error: () => {
        this.hasError.set(true);
      },
      complete: () => {},
    });
  }

  deleteTask(taskId: number): void {
    this.deleteLoading.set(true);

    this.taskLogService.delete(taskId).subscribe({
      next: () => {
        this.loadTasks();
        this.deleteLoading.set(false);
      },
      error: () => {
        console.error('Error deleting task');
        this.deleteLoading.set(false);
      },
    });
  }

  private calculateTimeSpent(startedAt: string, endedAt: string): string {
    const durationInMinutes = Math.max(
      0,
      Math.round((new Date(endedAt).getTime() - new Date(startedAt).getTime()) / 60000),
    );

    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;

    if (hours === 0) {
      return `${minutes}min`;
    }

    return minutes === 0 ? `${hours}h` : `${hours}h ${minutes}min`;
  }

  private categoryLabels: Record<TaskCategory, string> = {
    PRATICA: 'Prática',
    ASSISTIR_VIDEOAULA: 'Assistir videoaula',
    PESQUISA: 'Pesquisa',
  };
}
