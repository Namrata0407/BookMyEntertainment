import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../user-list/user-list.component';

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.css']
})
export class UpdateUserDialogComponent implements OnInit {
  
  updatedUser: User = {
    id: '',
    name: '',
    email: '',
    gender: '',
    membership_type: '',
  };
  // updatedUser: User;

  constructor(
    public dialogRef: MatDialogRef<UpdateUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  ngOnInit(): void {
    // Make a deep copy of the data object to avoid modifying the original data
    this.updatedUser = { ...this.data };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onUpdateClick(): void {
    // Perform any validation or data processing if needed
    // Update the user data
    this.dialogRef.close(this.updatedUser);
  }
}