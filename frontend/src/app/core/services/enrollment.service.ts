import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

import { EnrollmentRequest, EnrollmentResponse } from '../models/enrollment.model';

import { ApiErrorService } from './api-error.service';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private readonly http = inject(HttpClient);
  private readonly apiError = inject(ApiErrorService);

  private readonly apiUrl = 'http://localhost:8080/api/enrollments';

  getByStudent(studentId: number): Observable<EnrollmentResponse[]> {
    return this.http
      .get<EnrollmentResponse[]>(`${this.apiUrl}/student/${studentId}`)
      .pipe(catchError((error) => this.apiError.handle(error)));
  }

  getById(id: number): Observable<EnrollmentResponse> {
    return this.http
      .get<EnrollmentResponse>(`${this.apiUrl}/${id}`)
      .pipe(catchError((error) => this.apiError.handle(error)));
  }

  create(request: EnrollmentRequest): Observable<EnrollmentResponse> {
    return this.http
      .post<EnrollmentResponse>(this.apiUrl, request)
      .pipe(catchError((error) => this.apiError.handle(error)));
  }

  complete(id: number): Observable<EnrollmentResponse> {
    return this.http
      .post<EnrollmentResponse>(`${this.apiUrl}/${id}/complete`, {})
      .pipe(catchError((error) => this.apiError.handle(error)));
  }
}
