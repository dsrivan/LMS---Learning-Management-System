import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { LoginService } from '../../../core/auth/login.service';
import { AuthService } from '../../../core/auth/auth.service';
import { LoginRequest } from '../../../core/models/login.model';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
})
export class Login {
  private readonly loginService = inject(LoginService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loading = signal(false);
  hasError = signal(false);

  formData = {
    email: '',
    password: '',
  };

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    const request: LoginRequest = {
      email: this.formData.email.trim(),
      password: this.formData.password,
    };

    this.loading.set(true);

    this.loginService.login(request).subscribe({
      next: (response) => {
        this.authService.setToken(response.token);
        this.loading.set(false);
        this.hasError.set(false);

        this.authService.setToken(response.token);
        this.authService.setUser(response);

        const redirectUrl = response.role === 'ADMIN' ? '/admin/cursos' : '/dashboard';
        this.router.navigate([redirectUrl]);
      },
      error: () => {
        this.loading.set(false);
        this.hasError.set(true);
      },
    });
  }
}
