import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CourseService } from '../../../core/services/course.service';
import { CourseResponse } from '../../../core/models/course.model';

@Component({
  selector: 'app-course-list',
  imports: [RouterLink],
  templateUrl: './course-list.html',
})
export class CourseList implements OnInit {
  private readonly courseService = inject(CourseService);

  searchTerm = signal('');
  hasError = signal(false);
  loading = signal(true);
  deleteLoading = signal(false);

  courseList = signal<CourseResponse[]>([]);
  filteredCourseList = computed(() => {
    const searchTerm = this.searchTerm().trim().toLocaleLowerCase();

    if (!searchTerm) {
      return this.courseList();
    }

    return this.courseList().filter(
      (course) =>
        course.name.toLocaleLowerCase().includes(searchTerm) ||
        course.description.toLocaleLowerCase().includes(searchTerm),
    );
  });

  ngOnInit(): void {
    this.loadCourses();
  }

  private loadCourses(): void {
    this.courseService.getAll().subscribe({
      next: (courses) => {
        this.hasError.set(false);
        this.courseList.set(courses);
        this.loading.set(false);
      },
      error: () => {
        this.hasError.set(true);
        this.loading.set(false);
      },
      complete: () => {},
    });
  }

  deleteCourse(courseId: number): void {
    this.deleteLoading.set(true);

    this.courseService.delete(courseId).subscribe({
      next: () => {
        this.loadCourses();
        this.deleteLoading.set(false);
      },
      error: () => {
        console.error('Error deleting course');
        this.deleteLoading.set(false);
      },
    });
  }

  setSearchTerm(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }
}
