import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Wishlist } from 'src/app/models/wishlist';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-mywishlist',
  templateUrl: './mywishlist.component.html',
  styleUrls: ['./mywishlist.component.css'],
  standalone: false // This ensures compatibility with Angular 19 modules
})
export class MywishlistComponent implements OnInit {
  wishlist: Observable<Wishlist[]> | undefined;
  loggedUser = '';
  currRole = '';

  constructor(private _service: UserService, private _router: Router) {}

  ngOnInit(): void {
    const user = sessionStorage.getItem('loggedUser') || '{}';
    const role = sessionStorage.getItem('ROLE') || '{}';

    this.loggedUser = JSON.parse(user);
    this.currRole = JSON.parse(role);

    if (this.currRole === 'admin') {
      this.wishlist = this._service.getAllWishlist();
    } else {
      this.wishlist = this._service.getWishlistByEmail(this.loggedUser);
    }
  }

  visitCourse(coursename: string): void {
    this._router.navigate(['/fullcourse', coursename]);
  }

  openURL(url: string): void {
    window.open(url, '_blank');
  }
}
