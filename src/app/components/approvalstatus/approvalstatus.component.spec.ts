import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApprovalstatusComponent } from './approvalstatus.component';
import { ProfessorService } from 'src/app/services/professor.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ApprovalstatusComponent', () => {
  let component: ApprovalstatusComponent;
  let fixture: ComponentFixture<ApprovalstatusComponent>;
  let mockProfessorService: jasmine.SpyObj<ProfessorService>;

  beforeEach(async () => {
    // Create a mock service for ProfessorService
    mockProfessorService = jasmine.createSpyObj('ProfessorService', ['getProfessorList', 'getProfessorListByEmail', 'acceptRequestForProfessorApproval', 'rejectRequestForProfessorApproval']);

    // Provide mock data for the observable responses
    mockProfessorService.getProfessorList.and.returnValue(of([{ professorname: 'John Doe', email: 'john.doe@example.com', status: 'accept' }]));
    mockProfessorService.getProfessorListByEmail.and.returnValue(of([{ professorname: 'John Doe', email: 'john.doe@example.com', status: 'accept' }]));

    // TestBed configuration
    await TestBed.configureTestingModule({
      declarations: [ApprovalstatusComponent],
      providers: [
        { provide: ProfessorService, useValue: mockProfessorService }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Use this to avoid errors related to other components or directives in templates
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display professor approval status', () => {
    component.loggedUser = 'john.doe@example.com';
    component.currRole = 'professor';
    fixture.detectChanges();
    
    // Check if the table contains the professor's name and status
    const professorName = fixture.debugElement.query(By.css('.professor-name')).nativeElement;
    const professorStatus = fixture.debugElement.query(By.css('.professor-status')).nativeElement;
    
    expect(professorName.textContent).toContain('John Doe');
    expect(professorStatus.textContent).toContain('Accepted');
  });

  it('should call acceptRequest when accept button is clicked', () => {
    const acceptButton = fixture.debugElement.query(By.css('#acceptbtn')).nativeElement;
    acceptButton.click();
    
    expect(mockProfessorService.acceptRequestForProfessorApproval).toHaveBeenCalled();
  });

  it('should call rejectRequest when reject button is clicked', () => {
    const rejectButton = fixture.debugElement.query(By.css('#rejectbtn')).nativeElement;
    rejectButton.click();
    
    expect(mockProfessorService.rejectRequestForProfessorApproval).toHaveBeenCalled();
  });
});