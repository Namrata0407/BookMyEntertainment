import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  constructor(private router: Router) { }

  navigateToCreateShow() {
    // Navigate to the Create Show page (assuming you have defined the route)
    this.router.navigate(['/createshow']);
  }

  navigateToUserList() {
    // Navigate to the User List page (assuming you have defined the route)
    this.router.navigate(['/userlist']);
  }
}