import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CourseList } from './course-list';

describe('CourseList', () => {
  let component: CourseList;
  let fixture: ComponentFixture<CourseList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseList],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter courses by name or description', () => {
    component.courseList.set([
      {
        id: 1,
        name: 'Kubernetes',
        description: 'Orquestração de containers',
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 2,
        name: 'Angular',
        description: 'Interfaces web',
        createdAt: '',
        updatedAt: '',
      },
    ]);

    component.searchTerm.set('CONTAINERS');

    expect(component.filteredCourseList()).toHaveLength(1);
    expect(component.filteredCourseList()[0].name).toBe('Kubernetes');
  });
});
