import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { TaskForm } from '../task-form/task-form';
import { TaskLogRequest } from '../../../core/models/task-log.model';
import { TaskLogService } from '../../../core/services/task-log.service';

@Component({
  imports: [RouterLink, TaskForm],
  selector: 'app-task-create',
  styleUrl: './task-create.css',
  templateUrl: './task-create.html',
})
export class TaskCreate {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly taskLogService = inject(TaskLogService);

  readonly idEnrollment = this.route.snapshot.paramMap.get('idEnrollment');

  createTask(task: TaskLogRequest): void {
    task.enrollmentId = Number(this.idEnrollment);

    this.taskLogService.create(task).subscribe({
      next: (createdTask) => {
        this.router.navigate(['/cursos/meu-curso/', this.idEnrollment]);
      },
      error: (error) => {
        console.error('Error creating course:', error);
      },
    });
  }
}
