import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddprofessorComponent } from './addprofessor.component';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('AddprofessorComponent', () => {
  let component: AddprofessorComponent;
  let fixture: ComponentFixture<AddprofessorComponent>;
  let adminService: AdminService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AddprofessorComponent ],
      imports: [ HttpClientTestingModule, FormsModule ],
      providers: [
        AdminService,
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddprofessorComponent);
    component = fixture.componentInstance;
    adminService = TestBed.inject(AdminService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to dashboard after adding professor', () => {
    const professor = { professorname: 'John Doe', email: 'john@example.com' };
    component.professor = professor;
    spyOn(adminService, 'addProfessor').and.returnValue(of({}));

    component.addProfessor();
    
    expect(router.navigate).toHaveBeenCalledWith(['/admindashboard']);
  });

  it('should show error message when professor already exists', () => {
    const professor = { professorname: 'John Doe', email: 'john@example.com' };
    component.professor = professor;
    spyOn(adminService, 'addProfessor').and.returnValue(throwError({ error: 'Professor already exists' }));
    
    component.addProfessor();

    expect(component.msg).toContain('already exists');
  });
});