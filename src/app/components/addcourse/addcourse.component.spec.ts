import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddcourseComponent } from './addcourse.component';
import { ProfessorService } from 'src/app/services/professor.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

// Mocks
class ProfessorServiceMock {
  addCourse(course: any) {
    return of({ message: 'Course added successfully' });
  }
}

class RouterMock {
  navigate(url: string) {}
}

describe('AddcourseComponent', () => {
  let component: AddcourseComponent;
  let fixture: ComponentFixture<AddcourseComponent>;
  let professorServiceMock: ProfessorServiceMock;
  let routerMock: RouterMock;
  let submitButton: DebugElement;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcourseComponent ],
      imports: [ FormsModule ],
      providers: [
        { provide: ProfessorService, useClass: ProfessorServiceMock },
        { provide: Router, useClass: RouterMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcourseComponent);
    component = fixture.componentInstance;
    professorServiceMock = TestBed.inject(ProfessorService) as any;
    routerMock = TestBed.inject(Router) as any;
    fixture.detectChanges();
    submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the submit button when form is invalid', () => {
    // Initially the form is invalid
    expect(submitButton.nativeElement.disabled).toBe(true);
  });

  it('should call addCourse when form is valid and submit button is clicked', () => {
    // Mock valid form data
    component.course = {
      coursename: 'Test Course',
      instructorname: 'John Doe',
      coursetype: 'Website',
      language: 'English',
      enrolleddate: '2024-12-01',
      instructorinstitution: 'ABC University',
      description: 'A description of the course'
    };

    fixture.detectChanges();
    submitButton.nativeElement.click();
    
    // Mock the API response
    spyOn(professorServiceMock, 'addCourse').and.returnValue(of({ message: 'Course added successfully' }));
    spyOn(routerMock, 'navigate');
    
    expect(professorServiceMock.addCourse).toHaveBeenCalledWith(component.course);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/addchapter']);
  });

  it('should display error message when addCourse fails', () => {
    component.course = {
      coursename: 'Test Course',
      instructorname: 'John Doe',
      coursetype: 'Website',
      language: 'English',
      enrolleddate: '2024-12-01',
      instructorinstitution: 'ABC University',
      description: 'A description of the course'
    };

    fixture.detectChanges();

    spyOn(professorServiceMock, 'addCourse').and.returnValue(throwError({ error: 'Course already exists' }));
    
    submitButton.nativeElement.click();
    
    fixture.detectChanges();
    
    expect(component.msg).toBe('Course with Test Course already exists !!!');
  });
});