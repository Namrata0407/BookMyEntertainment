import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Booking {
  category: string;
  date: string;
  end_time: string;
  id: string;
  movie_id: string;
  poster: string;
  show_id: string;
  start_time: string;
  title: string;
  user_id: string;
  venue: string;
}

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent implements OnInit {
  bookings: Booking[] = [];
  token: string = '';
  isAuth:boolean = true

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('access_token') || '';
    this.fetchBookings();
  }

  fetchBookings(): void {
    const apiUrl = 'https://bookevent.onrender.com/bookshow';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    this.http.get<any>(apiUrl, { headers }).subscribe(
      (response) => {
        this.bookings = response as Booking[];
        this.isAuth = true
        console.log(response);
      },
      (error) => {
        console.error('Error fetching bookings data:', error);
        this.isAuth = false
      }
    );
  }

  deleteBooking(bookingId: string): void {
    const apiUrl = `https://bookevent.onrender.com/bookshow/${bookingId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    this.http.delete(apiUrl, { headers }).subscribe(
      () => {
        this.bookings = this.bookings.filter((booking) => booking.id !== bookingId);
        alert("Show deleted successfully")
      },
      (error) => {

        console.error('Error deleting booking:', error);
      }
    );
  }
}