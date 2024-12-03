import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FullcourseComponent } from './fullcourse.component';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FullcourseComponent', () => {
  let component: FullcourseComponent;
  let fixture: ComponentFixture<FullcourseComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['getChappterListByCourseName', 'getCourseListByName']);

    await TestBed.configureTestingModule({
      declarations: [FullcourseComponent],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: ActivatedRoute, useValue: { snapshot: { params: { coursename: 'Test Course' } } } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullcourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load course details on init', () => {
    const mockChapters = [
      { chapter1name: 'Chapter 1', chapter1id: '1' },
      { chapter2name: 'Chapter 2', chapter2id: '2' }
    ];
    const mockCourse = [
      { coursename: 'Test Course', description: 'Test description', courseid: '123', skilllevel: 'Beginner' }
    ];

    mockUserService.getChappterListByCourseName.and.returnValue(of(mockChapters));
    mockUserService.getCourseListByName.and.returnValue(of(mockCourse));

    component.ngOnInit();
    expect(component.chapterlist).toEqual(of(mockChapters));
    expect(component.courselist).toEqual(of(mockCourse));
  });
});
