import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

import { UserRequest, UserResponse } from '../models/user.model';

import { ApiErrorService } from './api-error.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly apiError = inject(ApiErrorService);

  private readonly apiUrl = 'http://localhost:8080/api/users';

  create(request: UserRequest): Observable<UserResponse> {
    return this.http
      .post<UserResponse>(this.apiUrl, request)
      .pipe(catchError((error) => this.apiError.handle(error)));
  }
}
