import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseComponent } from '../courselist/courselist.component';
import { CourseService } from '../../service/course.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CourseListComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;
  let courseService: CourseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CourseComponent],
      providers: [CourseService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    courseService = TestBed.inject(CourseService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load courses successfully', () => {
    const courses = [{ id: 1, name: 'Course 1', description: 'Description 1' }];
    spyOn(courseService, 'getCourses').and.returnValue(of(courses));

    component.loadCourses();
    fixture.detectChanges();

    expect(component.courses.length).toBe(1);
    expect(component.courses[0].name).toBe('Course 1');
  });

  it('should handle error when loading courses', () => {
    spyOn(courseService, 'getCourses').and.returnValue(throwError('Error'));

    component.loadCourses();
    fixture.detectChanges();

    expect(component.errorMessage).toBe('Error fetching courses');
  });
});
