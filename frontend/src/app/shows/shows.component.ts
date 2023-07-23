import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

interface Show {
  available_seats: number;
  category: string;
  date: string;
  end_time: string;
  id: string;
  movie_id: string;
  rating: number;
  start_time: string;
  ticket_price: number;
  venue: string;
  title: string;
}

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent implements OnInit {
  shows: Show[] = [];
  moviePoster: string = '';
  movieTitle: string = '';
  loading: Boolean = false;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((queryParams) => {
      const movieId = queryParams.get('movie_id');
      this.moviePoster = queryParams.get('poster') || '';
      this.movieTitle = queryParams.get('title') || '';
      if (movieId) {
        this.fetchShows(movieId);
      }
    });
  }

  fetchShows(movieId: string): void {
    this.loading = true;
    const apiUrl = `http://localhost:5000/shows?movie_id=${movieId}`; // Remove the const keyword
    this.http.get(apiUrl).subscribe(
      (response) => {
      
        this.shows = response as Show[];
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching shows data:', error);
      }
    );
  
  }

  onButtonClick(show: Show): void {
    const payload = {
      category: show.category,
      date: show.date,
      end_time: show.end_time,
      movie_id: show.movie_id,
      poster: this.moviePoster,
      start_time: show.start_time,
      title: this.movieTitle,
      show_id: show.id,
      venue: show.venue,
    };

    const apiUrl = 'http://localhost:5000/bookshow';
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No access token found.');
      alert("Please login first !!")
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    this.http.post(apiUrl, payload, { headers }).subscribe(
      () => {
        alert('Show added to your list successfully');
      },
      (error) => {
        alert("plese login again !!")
        console.error('Error adding show:', error);
      }
    );
  }
}