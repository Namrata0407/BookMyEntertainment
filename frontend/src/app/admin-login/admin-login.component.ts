import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) { }

  login() {
    // Check if the provided email and password are correct
    if (this.email === 'admin@gmail.com' && this.password === 'admin123') {
      // Show an alert for successful login
      alert('Login successful!');

      // Redirect to the "/admin" route after successful login
      this.router.navigate(['/adminhome']);
    } else {
      // Show an alert for invalid credentials
      alert('Invalid email or password. Please try again.');
    }
  }
}