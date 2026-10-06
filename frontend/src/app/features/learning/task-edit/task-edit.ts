import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { TaskLogRequest, TaskLogResponse } from '../../../core/models/task-log.model';
import { TaskLogService } from '../../../core/services/task-log.service';
import { TaskForm } from '../task-form/task-form';

@Component({
  imports: [RouterLink, TaskForm],
  selector: 'app-task-edit',
  styleUrl: './task-edit.css',
  templateUrl: './task-edit.html',
})
export class TaskEdit implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly taskLogService = inject(TaskLogService);

  readonly idEnrollment = this.route.snapshot.paramMap.get('idEnrollment');

  readonly idTask = this.route.snapshot.paramMap.get('idTask');

  task = signal<TaskLogResponse | null>(null);
  taskForEdit = signal<TaskLogRequest | null>(null);

  hasError = signal(false);
  loading = signal(true);
  saving = signal(false);

  private loadTask(): void {
    if (!this.idTask) {
      this.hasError.set(true);
      this.loading.set(false);
      return;
    }

    this.taskLogService.getById(Number(this.idTask)).subscribe({
      next: (task) => {
        this.hasError.set(false);

        this.task.set(task);

        this.taskForEdit.set({
          enrollmentId: task.enrollmentId,
          category: task.category,
          description: task.description,
          startedAt: task.startedAt,
          endedAt: task.endedAt,
        });

        this.loading.set(false);
      },
      error: () => {
        this.hasError.set(true);
        this.loading.set(false);
      },
    });
  }

  updateTask(task: TaskLogRequest): void {
    if (!this.idTask) {
      this.hasError.set(true);
      return;
    }

    this.saving.set(true);
    this.hasError.set(false);

    this.taskLogService.update(Number(this.idTask), task).subscribe({
      next: () => {
        this.saving.set(false);

        this.router.navigate(['/cursos/meu-curso', this.idEnrollment]);
      },
      error: () => {
        this.hasError.set(true);
        this.saving.set(false);
      },
    });
  }

  ngOnInit(): void {
    this.loadTask();
  }
}
