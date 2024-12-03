import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmindashboardComponent } from './admindashboard.component';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('AdmindashboardComponent', () => {
  let component: AdmindashboardComponent;
  let fixture: ComponentFixture<AdmindashboardComponent>;
  let adminService: AdminService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmindashboardComponent],
      providers: [
        AdminService,
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdmindashboardComponent);
    component = fixture.componentInstance;
    adminService = TestBed.inject(AdminService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display users count', () => {
    const users = ['User1', 'User2', 'User3'];
    spyOn(adminService, 'getTotalUsers').and.returnValue(of(users));

    component.ngOnInit();

    fixture.detectChanges();

    expect(component.users).toBeDefined();
  });

  it('should navigate to course list', () => {
    spyOn(router, 'navigate');
    component.goToCourseList();

    expect(router.navigate).toHaveBeenCalledWith(['/courselist']);
  });
});