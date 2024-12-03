import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = 'https://api.example.com/courses';  // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Fetch courses from the API
  getCourses(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
