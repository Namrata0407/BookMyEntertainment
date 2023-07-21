// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.css']
// })
// export class SignupComponent {

// }

// user = {
//   name: '',
//   email: '',
//   password: '',
//   confirmPassword: '',
//   membership_type: 'regular',
//   gender: 'male'
// };

// signup.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    membership_type: 'regular',
    gender: 'male'
  };

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  submitForm() {
    if (this.user.password !== this.user.confirmPassword) {
      console.error('Passwords do not match. Please try again.');
      return;
    }

    // If passwords match, proceed with the signup request
    const { confirmPassword, ...userData } = this.user;
    const url = 'http://localhost:5000/users';
    this.http.post(url, userData).subscribe(
      (response) => {
        console.log('User created successfully!', response);

        // Show success message as a snackbar
        this.snackBar.open('Account created successfully', 'Dismiss', {
          duration: 5000, // Duration for the message to be shown (in milliseconds)
          panelClass: 'success-snackbar' // CSS class for styling the snackbar
        });
      },
      (error) => {
        console.error('Error creating user:', error);
      }
    );
  }
}