import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';

interface Movie {
  description: string;
  duration: string;
  genre: string;
  id: string;
  language: string;
  poster: string;
  releaseDate: string;
  title: string;
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  itemsPerPage: number = 12;
  currentPage: number = 1;
  totalPages: number = 1;
  totalMoviesCount: number = 0; // Variable to store the total count of movies

  isFilterCollapsed: boolean = false;
  isLanguageCollapsed: boolean = false;
  isGenresCollapsed: boolean = false;
  isRatingCollapsed: boolean = false;
  isReleaseDateCollapsed: boolean = false;

  constructor(private http: HttpClient) {} // Import HttpClient and add it to the constructor

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies(): void {
    const apiUrl = 'http://127.0.0.1:5000/movies';
    const params = new HttpParams().set('page', this.currentPage.toString());

    this.http.get<Movie[]>(apiUrl, { params, observe: 'response' }).subscribe(
      (response: HttpResponse<Movie[]>) => {
        this.movies = response.body || [];
        const totalMoviesCountHeader = response.headers.get('X-Total-Count');
        this.totalMoviesCount = totalMoviesCountHeader ? +totalMoviesCountHeader : 0;
        this.totalPages = Math.ceil(this.totalMoviesCount / this.itemsPerPage);
      },
      (error: any) => {
        console.error('Error fetching movies data:', error);
      }
    );
  }

  toggleFilter(filterName: string): void {
    switch (filterName) {
      case 'language':
        this.isLanguageCollapsed = !this.isLanguageCollapsed;
        break;
      case 'genres':
        this.isGenresCollapsed = !this.isGenresCollapsed;
        break;
      case 'rating':
        this.isRatingCollapsed = !this.isRatingCollapsed;
        break;
      case 'releaseDate':
        this.isReleaseDateCollapsed = !this.isReleaseDateCollapsed;
        break;
      default:
        break;
    }
  }

  onPageChanged(newPage: number): void {
    this.currentPage = newPage;
    this.fetchMovies();
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchMovies();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchMovies();
    }
  }
}
