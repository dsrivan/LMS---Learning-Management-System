import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

import { LoginRequest, LoginResponse } from '../models/login.model';
import { ApiErrorService } from '../services/api-error.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly http = inject(HttpClient);
  private readonly apiError = inject(ApiErrorService);

  private readonly apiUrl = 'http://localhost:8080/api/auth/login';

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(this.apiUrl, request)
      .pipe(catchError((error) => this.apiError.handle(error)));
  }
}
