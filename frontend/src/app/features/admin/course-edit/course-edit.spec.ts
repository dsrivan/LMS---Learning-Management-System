import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseEdit } from './course-edit';
import { provideRouter } from '@angular/router';

describe('CourseEdit', () => {
  let component: CourseEdit;
  let fixture: ComponentFixture<CourseEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseEdit],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
