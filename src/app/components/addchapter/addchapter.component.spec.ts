import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddchapterComponent } from './addchapter.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfessorService } from 'src/app/services/professor.service';
import { of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

describe('AddchapterComponent', () => {
  let component: AddchapterComponent;
  let fixture: ComponentFixture<AddchapterComponent>;
  let mockService: jasmine.SpyObj<ProfessorService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('ProfessorService', ['getCourseListNames', 'addNewChapters']);

    await TestBed.configureTestingModule({
      declarations: [ AddchapterComponent ],
      imports: [
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule
      ],
      providers: [
        { provide: ProfessorService, useValue: mockService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddchapterComponent);
    component = fixture.componentInstance;
    mockService.getCourseListNames.and.returnValue(of([{ name: 'Course 1' }, { name: 'Course 2' }]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load course names', () => {
    expect(component.coursenames).toBeDefined();
  });

  it('should call addChapters method on submit', () => {
    const spy = spyOn(component, 'addChapters');
    component.addChapters();
    expect(spy).toHaveBeenCalled();
  });
});