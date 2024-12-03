import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.css']
})
export class AddCourseComponent implements OnInit {

  course = new Course();
  msg = '';

  constructor(private professorService: ProfessorService, private router: Router) {}

  ngOnInit(): void {}

  toggleFields(): void {
    const { coursetype } = this.course;
    this.course.youtubeurl = coursetype === 'Youtube' ? this.course.youtubeurl : '';
    this.course.websiteurl = coursetype === 'Website' ? this.course.websiteurl : '';
  }

  addCourse(): void {
    this.professorService.addCourse(this.course).subscribe(
      () => {
        console.log('Course added successfully!');
        this.router.navigate(['/addchapter']);
      },
      (error) => {
        console.log('Error occurred:', error);
        this.msg = `Course with name "${this.course.coursename}" already exists!`;
      }
    );
  }
}

