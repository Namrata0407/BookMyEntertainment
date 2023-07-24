// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { MatDialog } from '@angular/material/dialog';

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserDialogComponent } from '../update-user-dialog/update-user-dialog.component';

export interface User {
  id: string;
  name: string;
  email: string;
  gender: string;
  membership_type: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private http: HttpClient, private dialog: MatDialog) {}


  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http.get<User[]>('https://bookevent.onrender.com/users').subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  deleteUser(userId: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      // Make API call to delete user with given ID
      this.http.delete(`https://bookevent.onrender.com/users/${userId}`).subscribe(
        () => {
          // Update the list of users after successful deletion
          this.users = this.users.filter((user) => user.id !== userId);
          alert('User deleted successfully!');
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }

  openUpdateDialog(user: User): void {
    const dialogRef = this.dialog.open(UpdateUserDialogComponent, {
      width: '400px',
      data: user
    });
  
    dialogRef.afterClosed().subscribe((result: User) => {
      if (result) {
        // Perform update operation or update the user in the list
        const index = this.users.findIndex(u => u.id === result.id);
        if (index !== -1) {
          this.users[index] = result;
          // Perform API call to update user data
          this.http.put(`https://bookevent.onrender.com/users/${result.id}`, result).subscribe(
            () => {
              // Update successful
              alert('User updated successfully!');
            },
            (error) => {
              console.error('Error updating user:', error);
            }
          );
        }
      }
    });
  }
  
}