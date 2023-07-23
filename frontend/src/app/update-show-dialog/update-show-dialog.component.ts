import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface Show {
  available_seats: number;
  category: string;
  date: string;
  end_time: string;
  movie_id: string;
  rating: number;
  start_time: string;
  ticket_price: number;
  venue: string;
}

@Component({
  selector: 'app-update-show-dialog',
  templateUrl: './update-show-dialog.component.html',
  styleUrls: ['./update-show-dialog.component.css']
})
export class UpdateShowDialogComponent {
  show: Show;

  constructor(
    public dialogRef: MatDialogRef<UpdateShowDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Show
  ) {
    // Assign the data passed from the parent component to the show object
    this.show = { ...data };
  }

  onUpdateClick(): void {
    // Perform any validation if needed

    // Close the dialog and pass the updated show data to the parent component
    this.dialogRef.close(this.show);
  }

  onNoClick(): void {
    // Close the dialog without any changes
    this.dialogRef.close();
  }
}