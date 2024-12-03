import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedUser = '';  // Holds the logged-in user's email
  currRole = '';    // Holds the role of the logged-in user (admin, professor, user)
  title = '';       // Holds the title of the dashboard

  constructor(private _router: Router) { }

  ngOnInit(): void {
    // Get user data from sessionStorage
    this.loggedUser = sessionStorage.getItem('loggedUser') || '';
    this.currRole = sessionStorage.getItem('ROLE') || '';

    // Set the title based on the user role
    if (this.loggedUser === "admin@gmail.com") {
      this.title = "Admin Dashboard";
    } else if (this.currRole === "professor") {
      this.title = "Professor Dashboard";
    } else if (this.currRole === "user") {
      this.title = "User Dashboard";
    }
  }

  // Logout method
  logout() {
    sessionStorage.clear();  // Clear session storage on logout
    this._router.navigate(['/login']);  // Redirect to login page
  }

  // Navigate home based on user role
  navigateHome() {
    if (this.loggedUser === "admin@gmail.com") {
      this._router.navigate(['/admindashboard']);
    } else if (this.currRole === "professor") {
      this._router.navigate(['/professordashboard']);
    } else if (this.currRole === "user") {
      this._router.navigate(['/userdashboard']);
    }
  }
}
