import { Component, input, output, signal, SimpleChanges } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { CourseRequest } from '../../../core/models/course.model';

@Component({
  imports: [RouterLink, FormsModule],
  selector: 'app-course-form',
  templateUrl: './course-form.html',
})
export class CourseForm {
  readonly action = input<string>('Default action');
  readonly course = input<CourseRequest | null>(null);
  readonly submitted = output<CourseRequest>();

  loading = signal(false);
  formData: CourseRequest = {
    name: '',
    description: '',
  };

  ngOnChanges(changes: SimpleChanges): void {
    const course = this.course();

    if (changes['course'] && course) {
      this.formData = {
        name: course.name,
        description: course.description,
      };
    }
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      this.loading.set(false);
      return;
    }
    this.loading.set(true);

    this.submitted.emit({
      name: this.formData.name.trim(),
      description: this.formData.description.trim(),
    });
  }
}
