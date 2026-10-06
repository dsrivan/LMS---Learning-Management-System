import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

import { CourseRequest, CourseResponse } from '../models/course.model';

import { ApiErrorService } from './api-error.service';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private readonly http = inject(HttpClient);
  private readonly apiError = inject(ApiErrorService);

  private readonly apiUrl = 'http://localhost:8080/api/courses';

  getAll(): Observable<CourseResponse[]> {
    return this.http
      .get<CourseResponse[]>(this.apiUrl)
      .pipe(catchError((error) => this.apiError.handle(error)));
  }

  getById(id: number): Observable<CourseResponse> {
    return this.http
      .get<CourseResponse>(`${this.apiUrl}/${id}`)
      .pipe(catchError((error) => this.apiError.handle(error)));
  }

  create(request: CourseRequest): Observable<CourseResponse> {
    return this.http
      .post<CourseResponse>(this.apiUrl, request)
      .pipe(catchError((error) => this.apiError.handle(error)));
  }

  update(id: number, request: CourseRequest): Observable<CourseResponse> {
    return this.http
      .put<CourseResponse>(`${this.apiUrl}/${id}`, request)
      .pipe(catchError((error) => this.apiError.handle(error)));
  }

  delete(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError((error) => this.apiError.handle(error)));
  }
}
