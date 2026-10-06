import { Component, inject, input, OnChanges, output, signal, SimpleChanges } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { TaskLogRequest } from '../../../core/models/task-log.model';

interface TaskCategory {
  value: 'PESQUISA' | 'PRATICA' | 'ASSISTIR_VIDEOAULA';
  label: string;
  icon: string;
}

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  templateUrl: './task-form.html',
})
export class TaskForm implements OnChanges {
  readonly action = input<string>('Cadastrar tarefa');
  readonly task = input<TaskLogRequest | null>(null);
  readonly submitted = output<TaskLogRequest>();

  private readonly route = inject(ActivatedRoute);

  readonly enrollmentId = Number(this.route.snapshot.paramMap.get('idEnrollment') ?? 0);

  protected readonly categories: TaskCategory[] = [
    {
      value: 'PESQUISA',
      label: 'Pesquisa',
      icon: 'M21 21l-4.3-4.3M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z',
    },
    {
      value: 'PRATICA',
      label: 'Prática',
      icon: 'm16 18 6-6-6-6M8 6l-6 6 6 6',
    },
    {
      value: 'ASSISTIR_VIDEOAULA',
      label: 'Assistir videoaula',
      icon: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM10 8l6 4-6 4z',
    },
  ];

  protected readonly spentTimeList = [
    '30min',
    '1h',
    '1h 30min',
    '2h',
    '2h 30min',
    '3h',
    '3h 30min',
    '4h',
  ];

  protected readonly loading = signal(false);

  formData = {
    category: 'PESQUISA' as TaskCategory['value'],
    description: '',
    date: '',
    spentTime: '',
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['task']) {
      return;
    }

    const task = this.task();

    if (!task) {
      return;
    }

    this.formData = {
      category: task.category,
      description: task.description,
      date: task.startedAt.slice(0, 10),
      spentTime: this.getSpentTime(task.startedAt, task.endedAt),
    };
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const startedAt = new Date(`${this.formData.date}T00:00:00`);

    const spentMinutes = this.getSpentTimeInMinutes(this.formData.spentTime);

    const endedAt = new Date(startedAt.getTime() + spentMinutes * 60 * 1000);

    this.submitted.emit({
      enrollmentId: this.enrollmentId,
      category: this.formData.category,
      description: this.formData.description.trim(),
      startedAt: startedAt.toISOString(),
      endedAt: endedAt.toISOString(),
    });

    this.loading.set(false);
  }

  private getSpentTimeInMinutes(spentTime: string): number {
    const timeMap: Record<string, number> = {
      '30min': 30,
      '1h': 60,
      '1h 30min': 90,
      '2h': 120,
      '2h 30min': 150,
      '3h': 180,
      '3h 30min': 210,
      '4h': 240,
    };

    return timeMap[spentTime] ?? 0;
  }

  private getSpentTime(startedAt: string, endedAt: string): string {
    const start = new Date(startedAt).getTime();
    const end = new Date(endedAt).getTime();

    const minutes = Math.round((end - start) / (60 * 1000));

    const timeMap: Record<number, string> = {
      30: '30min',
      60: '1h',
      90: '1h 30min',
      120: '2h',
      150: '2h 30min',
      180: '3h',
      210: '3h 30min',
      240: '4h',
    };

    return timeMap[minutes] ?? '';
  }
}
