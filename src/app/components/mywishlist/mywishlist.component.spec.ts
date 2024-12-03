import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MywishlistComponent } from './mywishlist.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

describe('MywishlistComponent', () => {
  let component: MywishlistComponent;
  let fixture: ComponentFixture<MywishlistComponent>;
  let userService: UserService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [MywishlistComponent],
      providers: [UserService]
    }).compileComponents();

    fixture = TestBed.createComponent(MywishlistComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllWishlist for admin role', () => {
    spyOn(userService, 'getAllWishlist').and.returnValue(of([]));
    sessionStorage.setItem('ROLE', '"admin"');
    component.ngOnInit();
    expect(userService.getAllWishlist).toHaveBeenCalled();
  });

  it('should call getWishlistByEmail for non-admin role', () => {
    spyOn(userService, 'getWishlistByEmail').and.returnValue(of([]));
    sessionStorage.setItem('loggedUser', '"user@example.com"');
    sessionStorage.setItem('ROLE', '"user"');
    component.ngOnInit();
    expect(userService.getWishlistByEmail).toHaveBeenCalledWith('user@example.com');
  });

  it('should navigate to fullcourse when visitCourse is called', () => {
    spyOn(router, 'navigate');
    component.visitCourse('TestCourse');
    expect(router.navigate).toHaveBeenCalledWith(['/fullcourse', 'TestCourse']);
  });

  it('should open a new URL in a tab', () => {
    spyOn(window, 'open');
    component.openURL('http://example.com');
    expect(window.open).toHaveBeenCalledWith('http://example.com', '_blank');
  });
});
