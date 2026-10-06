import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { UserService } from '../../../core/services/user.service';
import { UserRequest } from '../../../core/models/user.model';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
})
export class Register {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  formData = {
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  };

  loading = false;

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    if (this.formData.password !== this.formData.confirmPassword) {
      return;
    }

    const request: UserRequest = {
      firstName: this.formData.firstName.trim(),
      lastName: this.formData.lastName.trim(),
      birthDate: this.formData.birthDate,
      email: this.formData.email.trim(),
      phone: this.formData.phone.trim(),
      password: this.formData.password,
    };

    this.loading = true;

    this.userService.create(request).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
