import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../service/course.service';

@Component({
  selector: 'app-courselist',
  templateUrl: './courselist.component.html',
  styleUrls: ['./courselist.component.css']
})
export class CourseComponent implements OnInit {
  errorMessage(errorMessage: any) {
    throw new Error('Method not implemented.');
  }
  courses = [];
  wishlist = [];
  enrollmentSuccess = false;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  // Load courses from the service
  loadCourses(): void {
    this.courseService.getCourses().subscribe((data: any) => {
      this.courses = data;
    });
  }

  // Get YouTube embed URL
  getYouTubeEmbedUrl(url: string): string {
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  // View course details (can be a modal or another page)
  viewCourseDetails(course: any): void {
    // Navigate to course details page or open a modal
    console.log('Viewing course details for', course);
  }

  // Enroll in the course and show success message
  enrollInCourse(course: any): void {
    this.enrollmentSuccess = true;
    setTimeout(() => {
      this.enrollmentSuccess = false;
    }, 3000);  // Success message disappears after 3 seconds
    // Handle actual enrollment logic here
    console.log('Enrolled in', course);
  }

  // Add/remove from wishlist
  toggleWishlist(course: any): void {
    const index = this.wishlist.findIndex(item => item.id === course.id);
    if (index === -1) {
      this.wishlist.push(course);  // Add to wishlist
    } else {
      this.wishlist.splice(index, 1);  // Remove from wishlist
    }
  }

  // Check if the course is in the wishlist
  isInWishlist(course: any): boolean {
    return this.wishlist.some(item => item.id === course.id);
  }
}
