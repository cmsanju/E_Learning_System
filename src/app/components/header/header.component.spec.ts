import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';  // Importing RouterTestingModule
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        RouterTestingModule.withRoutes([])  // Initialize RouterTestingModule with no routes initially
      ],
      schemas: [NO_ERRORS_SCHEMA]  // Ignores unrecognized elements (like <router-outlet>)
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);  // Get Router instance for navigation testing
    fixture.detectChanges();  // Detect changes in the component
  });

  it('should create the header component', () => {
    expect(component).toBeTruthy();
  });

  it('should set title based on loggedUser and currRole', () => {
    // Simulate sessionStorage values
    sessionStorage.setItem('loggedUser', 'admin@gmail.com');
    sessionStorage.setItem('ROLE', 'admin');

    // Manually trigger ngOnInit lifecycle hook
    component.ngOnInit();
    
    // Verify the title based on the role
    expect(component.title).toBe('Admin Dashboard');
  });

  it('should log out the user and navigate to login', () => {
    const spy = spyOn(router, 'navigate');  // Spy on the router navigate method

    component.logout();  // Call the logout method

    expect(sessionStorage.getItem('loggedUser')).toBeNull();  // Check if session storage is cleared
    expect(spy).toHaveBeenCalledWith(['/login']);  // Check if navigation to login is triggered
  });

  it('should navigate to the correct dashboard based on user role', () => {
    const spy = spyOn(router, 'navigate');  // Spy on the router navigate method

    // Simulate user login
    sessionStorage.setItem('loggedUser', 'admin@gmail.com');
    sessionStorage.setItem('ROLE', 'admin');

    component.navigateHome();  // Call the navigateHome method

    expect(spy).toHaveBeenCalledWith(['/admindashboard']);  // Verify navigation
  });
});