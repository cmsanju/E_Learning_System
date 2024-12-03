import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Chapter } from 'src/app/models/chapter';
import { UserService } from 'src/app/services/user.service';
import * as $ from 'jquery';
import { Course } from 'src/app/models/course';

declare var require: any;
const FileSaver = require('file-saver');

@Component({
  selector: 'app-fullcourse',
  templateUrl: './fullcourse.component.html',
  styleUrls: ['./fullcourse.component.css']
})
export class FullcourseComponent implements OnInit {

  video = 'Ez8F0nW6S-w';
  courseName = 'Github';
  chapterlist: Observable<Chapter[]> | undefined;
  courselist: Observable<Course[]> | undefined;
  chapter = new Chapter();

  constructor(
    private _router: Router,
    private _service: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.courseName = this.activatedRoute.snapshot.params['coursename'];

    // Set up YouTube video API script if not already loaded
    const target = 'https://www.youtube.com/iframe_api';
    if (!this.isScriptLoaded(target)) {
      const tag = document.createElement('script');
      tag.src = target;
      document.body.appendChild(tag);
    }

    // Get course details and chapter list
    this.chapterlist = this._service.getChappterListByCourseName(this.courseName);
    this.courselist = this._service.getCourseListByName(this.courseName);

    // Show the overview by default
    this.showSection('overview');
  }

  showSection(section: string): void {
    const sections = ['overview', 'qa', 'notes', 'announcements', 'downloads'];
    sections.forEach((sec) => {
      if (sec === section) {
        $("#" + sec).show();
      } else {
        $("#" + sec).hide();
      }
    });

    if (section === 'downloads') {
      $("#downloadalert").css("display", "block");
    } else {
      $("#downloadalert").css("display", "none");
    }
  }

  openOverview(): void {
    this.showSection('overview');
  }

  openQandA(): void {
    this.showSection('qa');
  }

  openNotes(): void {
    this.showSection('notes');
  }

  openAnnouncements(): void {
    this.showSection('announcements');
  }

  openDownloads(): void {
    this.showSection('downloads');
  }

  newQuestion(): void {
    $("#questions").toggle();
  }

  newNotes(): void {
    $("#notestxt").toggle();
  }

  setChapter(index: number): void {
    const chapterBox = $(".box" + index);
    const chapterClass = $(".chapter" + index);

    chapterBox.css("background-color", "green");
    chapterClass.addClass("selected");

    // Reset other chapters
    for (let i = 1; i <= 8; i++) {
      if (i !== index) {
        $(".box" + i).css("background-color", "white");
        $(".chapter" + i).removeClass("selected");
      }
    }
  }

  openChapter(chapterId: string): void {
    this.video = chapterId;
  }

  isScriptLoaded(target: string): boolean {
    return document.querySelector('script[src="' + target + '"]') ? true : false;
  }

  downloadPdf(): void {
    const pdfUrl = './assets/Introduction to Spring MVC.pdf';
    const pdfName = 'Introduction to Spring MVC';
    FileSaver.saveAs(pdfUrl, pdfName);
  }

  openDoc(): void {
    const pdfUrl = './assets/Introduction to Spring MVC.pdf';
    window.open(pdfUrl + '#page=1', '_blank', 'true');
  }

}
