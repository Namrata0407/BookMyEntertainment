import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { UpdateShowDialogComponent, Show } from '../update-show-dialog/update-show-dialog.component';
import { AddMovieModalComponent } from '../add-movie-modal/add-movie-modal.component';
import { ActivatedRoute, Router } from '@angular/router';

export interface Movies  {
  description: string,
  duration: string,
  genre: string,
  id: string,
  language: string,
  poster: string,
  releaseDate: string,
  title: string,
}

@Component({
  selector: 'app-create-shows',
  templateUrl: './create-shows.component.html',
  styleUrls: ['./create-shows.component.css']
})
export class CreateShowsComponent implements OnInit {
  users: Movies[] = [];
  currentPage: number = 1;
  totalPages: number = 10;
  itemsPerPage: number = 12;
  isMoviesRoute: boolean = false;

  constructor(private http: HttpClient, private dialog: MatDialog,private router: Router, private route: ActivatedRoute ) {}

  

  deleteUser(userId: string) {
    const apiUrl = `http://localhost:5000/movies/${userId}`;

    this.http.delete(apiUrl).subscribe(
      () => {
        this.users = this.users.filter((users) => users.id !== userId);
        alert("movie deleted successfully")
      },
      (error) => {
        console.error('Error deleting booking:', error);
      }
    );
  }

  openUpdateDialog(movie: Movies) {
    const show: Show = {
      available_seats: 0, // Set default or initial value for available_seats
      category: '',
      date: '',
      end_time: '',
      movie_id: movie.id, // Use the ID from the selected movie
      rating: 0, // Set default or initial value for rating
      start_time: '',
      ticket_price: 0, // Set default or initial value for ticket_price
      venue: ''
    };
  
    const dialogRef = this.dialog.open(UpdateShowDialogComponent, {
      width: '400px',
      data: show // Pass the created show object to the modal component
    });
  
    dialogRef.afterClosed().subscribe((updatedShow: Show) => {
      if (updatedShow) {
        // Perform the POST request with the updatedShow object
        // Use the HttpClient to make the POST request
        this.http.post('http://localhost:5000/shows', updatedShow).subscribe(
          () => {
            // Handle successful response (if needed)
            alert('Show added successfully!');
          },
          (error) => {
            console.error('Error updating show:', error);
          }
        );
      }
    });
  }

  ngOnInit(): void {
    this.isMoviesRoute = this.route.snapshot.url[0].path === 'createshow';
    this.route.queryParams.subscribe((queryParams) => {
      const title = queryParams['title'] || '';
      this.currentPage = parseInt(queryParams['page']) || 1;
      this.fetchUsers(title);
    });
  }

  fetchUsers(title: string): void {
    const apiUrl = `http://127.0.0.1:5000/movies?page=${this.currentPage}&page_size=${this.itemsPerPage}&title=${title}`;
    this.http.get<Movies[]>(apiUrl).subscribe(
      (response) => {
        this.users = response;
      },
      (error: any) => {
        console.error('Error fetching movies data:', error);
      }
    );
  }

  openAddMovieDialog() {
    const dialogRef = this.dialog.open(AddMovieModalComponent, {
      width: '500px',
      data: {},
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      // You can perform actions after the dialog is closed here
    });
  }
  
  onPageChanged(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.updateUrlParams();
    }
  }

  updateUrlParams() {
    const queryParams = { page: this.currentPage };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });
  }
}
