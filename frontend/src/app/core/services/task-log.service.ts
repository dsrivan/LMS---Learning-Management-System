import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

import { TaskLogRequest, TaskLogResponse } from '../models/task-log.model';

import { ApiErrorService } from './api-error.service';

@Injectable({
  providedIn: 'root',
})
export class TaskLogService {
  private readonly http = inject(HttpClient);
  private readonly apiError = inject(ApiErrorService);

  private readonly apiUrl = 'http://localhost:8080/api/tasks';

  getById(id: number): Observable<TaskLogResponse> {
    return this.http
      .get<TaskLogResponse>(`${this.apiUrl}/${id}`)
      .pipe(catchError((error) => this.apiError.handle(error)));
  }

  getByEnrollment(enrollmentId: number): Observable<TaskLogResponse[]> {
    return this.http
      .get<TaskLogResponse[]>(`${this.apiUrl}/enrollment/${enrollmentId}`)
      .pipe(catchError((error) => this.apiError.handle(error)));
  }

  create(request: TaskLogRequest): Observable<TaskLogResponse> {
    return this.http
      .post<TaskLogResponse>(this.apiUrl, request)
      .pipe(catchError((error) => this.apiError.handle(error)));
  }

  update(id: number, request: TaskLogRequest): Observable<TaskLogResponse> {
    return this.http
      .put<TaskLogResponse>(`${this.apiUrl}/${id}`, request)
      .pipe(catchError((error) => this.apiError.handle(error)));
  }

  delete(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError((error) => this.apiError.handle(error)));
  }
}
