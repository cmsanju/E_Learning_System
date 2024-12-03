import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';  
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Chapter } from 'src/app/models/chapter';
import { ProfessorService } from '../../service/professor.service';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-addchapter',
  templateUrl: './addchapter.component.html',
  styleUrls: ['./addchapter.component.css']
})
export class AddchapterComponent implements OnInit {
  chapter = new Chapter();
  coursenames: Observable<Course[]> | undefined;

  constructor(private _router: Router, private _service: ProfessorService) {}

  ngOnInit(): void {
    this.coursenames = this._service.getCourseListNames();
  }

  showNextChapter(index: number): void {
    const nextChapter = index + 1;
    const nextChapterId = `#chapter${nextChapter}`;
    const nextButtonId = `#chapter${nextChapter}btn`;

    if ($(nextChapterId).length) {
      $(nextChapterId).show();
      $(nextButtonId).hide();
    }
  }

  removeChapter(index: number): void {
    const chapterId = `#chapter${index + 1}`;
    const chapterNameId = `#chapter${index + 1}nametxt`;
    const chapterUrlId = `#chapter${index + 1}idtxt`;

    $(chapterId).hide();
    $(chapterNameId).val('');
    $(chapterUrlId).val('');

    const prevChapterButtonId = `#chapter${index}btn`;
    $(prevChapterButtonId).show();
  }

  addChapters(): void {
    this._service.addNewChapters(this.chapter).subscribe(
      (      data: any) => {
        console.log("Chapter added successfully!");
        this._router.navigate(['/professordashboard']);
      },
      (      error: { error: any; }) => {
        console.error("Chapter adding failed!", error.error);
      }
    );
  }
}
