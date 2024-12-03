import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MycoursesComponent } from './mycourses.component';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RouterModule } from '@angular/router'; // Updated import
import { HttpClientModule } from '@angular/common/http'; // Updated import
import { CarouselModule } from 'ngx-owl-carousel-o'; // Correct module import

describe('MycoursesComponent', () => {
  let component: MycoursesComponent;
  let fixture: ComponentFixture<MycoursesComponent>;
  let userService: UserService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]), // Updated import with routing setup
        HttpClientModule, // Updated HttpClientModule
        CarouselModule, // Correct module import
      ],
      declarations: [MycoursesComponent],
      providers: [UserService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MycoursesComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);

    // Mock sessionStorage data
    sessionStorage.setItem('loggedUser', 'testuser@gmail.com');
    sessionStorage.setItem('ROLE', 'user');

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load enrollments from the service', () => {
    const mockEnrollments: Observable<any[]> = of([
      { coursename: 'Course 1', enrolleduserid: 'user123', enrolleddate: '2024-12-01', instructorname: 'Instructor 1', enrolledcount: 50, courseid: 'C101' },
      { coursename: 'Course 2', enrolleduserid: 'user456', enrolleddate: '2024-12-05', instructorname: 'Instructor 2', enrolledcount: 40, courseid: 'C102' }
    ]);

    spyOn(userService, 'getEnrollmentByEmail').and.returnValue(mockEnrollments);

    component.ngOnInit();

    component.myenrollments?.subscribe((enrollments: string | any[]) => {
      expect(enrollments.length).toBe(2);
      expect(enrollments[0].coursename).toBe('Course 1');
    });
  });

  it('should navigate to full course page on visitCourse', () => {
    spyOn(router, 'navigate');
    
    component.visitCourse('Course 1');
    expect(router.navigate).toHaveBeenCalledWith(['/fullcourse', 'Course 1']);
  });

  it('should check if YouTube script is loaded', () => {
    const target = 'https://www.youtube.com/iframe_api';
    const scriptLoaded = component.isScriptLoaded(target);

    expect(scriptLoaded).toBeFalse();
  });

  it('should add YouTube script if not already loaded', () => {
    spyOn(document.body, 'appendChild');

    component.loadYouTubeAPI();
    
    expect(document.body.appendChild).toHaveBeenCalled();
  });
});
