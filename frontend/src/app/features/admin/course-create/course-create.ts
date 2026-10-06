import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { CourseService } from '../../../core/services/course.service';
import { CourseRequest } from '../../../core/models/course.model';
import { CourseForm } from '../course-form/course-form';

@Component({
  imports: [RouterLink, CourseForm],
  selector: 'app-course-create',
  styleUrl: './course-create.css',
  templateUrl: './course-create.html',
})
export class CourseCreate {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly courseService = inject(CourseService);

  createCourse(course: CourseRequest): void {
    this.courseService.create(course).subscribe({
      next: (createdCourse) => {
        this.router.navigate(['/admin/cursos']);
      },
      error: (error) => {
        console.error('Error creating course:', error);
      },
    });
  }
}
