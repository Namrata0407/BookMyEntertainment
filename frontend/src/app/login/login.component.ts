import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };

  constructor(private http: HttpClient, private snackBar: MatSnackBar,private router: Router) {}

  submitForm() {
    // Send a POST request to the API with the user credentials
    this.http.post<any>('https://bookevent.onrender.com/login', this.user).subscribe(
      (response) => {
        // If the login is successful, store the token in the local storage
        localStorage.setItem('access_token', response.access_token);
        // Show a success message using MatSnackBar

        alert("Login successful!!")
        this.router.navigate(['/']);

        this.snackBar.open('Login successful!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      },
      (error) => {
        alert("Wrong Credentials!")
        // If there's an error, show an error message using MatSnackBar
        this.snackBar.open('Login failed. Please check your email and password.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    );
  }
}