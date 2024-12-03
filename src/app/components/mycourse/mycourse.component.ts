import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { Enrollment } from 'src/app/models/enrollment';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mycourses',
  templateUrl: './mycourses.component.html',
  styleUrls: ['./mycourses.component.css']
})
export class MycoursesComponent implements OnInit {

  myenrollments: Observable<Enrollment[]> | undefined;
  loggedUser = '';
  currRole = '';

  constructor(private _service: UserService, private _router: Router) { }

  ngOnInit(): void {
    this.loggedUser = sessionStorage.getItem('loggedUser') || '';
    this.currRole = sessionStorage.getItem('ROLE') || '';

    if (this.loggedUser && this.currRole) {
      this.myenrollments = this._service.getEnrollmentByEmail(this.loggedUser, this.currRole);
    }

    this.loadYouTubeAPI();
  }

  loadYouTubeAPI(): void {
    const target = 'https://www.youtube.com/iframe_api';
    if (!this.isScriptLoaded(target)) {
      const tag = document.createElement('script');
      tag.src = target;
      document.body.appendChild(tag);
    }
  }

  isScriptLoaded(target: string): boolean {
    return document.querySelector(`script[src="${target}"]`) ? true : false;
  }

  visitCourse(coursename: string): void {
    this._router.navigate(['/fullcourse', coursename]);
  }

  owlDragging(e: any): void {
    console.log(e);
  }

  owlOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    margin: 50,
    stagePadding: 20,
    pullDrag: true,
    dots: false,
    navSpeed: 1000,
    autoplay: true,
    navText: ['Previous', 'Next'],
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      767: { items: 2 },
      1024: { items: 3 }
    },
    nav: true
  }
}