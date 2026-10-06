import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { CourseService } from '../../../core/services/course.service';
import { CourseRequest, CourseResponse } from '../../../core/models/course.model';
import { CourseForm } from '../course-form/course-form';

@Component({
  imports: [RouterLink, CourseForm],
  selector: 'app-course-edit',
  styleUrl: './course-edit.css',
  templateUrl: './course-edit.html',
})
export class CourseEdit implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly courseService = inject(CourseService);

  readonly courseId = this.route.snapshot.paramMap.get('id') || null;

  course = signal<CourseResponse | null>(null);
  courseForEdit = signal<CourseRequest | null>(null);
  hasError = signal(false);
  loading = signal(true);

  private loadCourse(): void {
    if (!this.courseId) {
      this.hasError.set(true);
      this.loading.set(false);
      return;
    }

    this.courseService.getById(Number(this.courseId)).subscribe({
      next: (course) => {
        this.hasError.set(false);

        this.course.set(course);
        this.courseForEdit.set({
          name: course.name,
          description: course.description,
        });

        this.loading.set(false);
      },
      error: () => {
        this.hasError.set(true);
        this.loading.set(false);
      },
      complete: () => {},
    });
  }

  updateCourse(course: CourseRequest): void {
    this.courseService.update(Number(this.courseId), course).subscribe({
      next: (updatedCourse) => {
        this.router.navigate(['/admin/cursos']);
      },
      error: (error) => {
        console.error('Error updating course:', error);
      },
    });
  }

  ngOnInit(): void {
    this.loadCourse();
  }
}
