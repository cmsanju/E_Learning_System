import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CourseService } from './course.service';
import { Course } from './course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService]
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch courses', () => {
    const mockCourses: Course[] = [
      { id: 1, name: 'Course 1', description: 'Description 1' }
    ];

    service.getCourses().subscribe((courses) => {
      expect(courses.length).toBe(1);
      expect(courses[0].name).toBe('Course 1');
    });

    const req = httpMock.expectOne('https://api.example.com/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should handle error on fetch', () => {
    service.getCourses().subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toBe('Error');
      }
    });

    const req = httpMock.expectOne('https://api.example.com/courses');
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });
});
