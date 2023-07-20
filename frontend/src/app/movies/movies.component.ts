import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies: any[] = [];
 

  isFilterCollapsed: boolean = false;
  isLanguageCollapsed: boolean = false;
  isGenresCollapsed: boolean = false;
  isRatingCollapsed: boolean = false;
  isReleaseDateCollapsed: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies(): void {
    const apiUrl = 'http://127.0.0.1:5000/movies';
    this.http.get<any[]>(apiUrl).subscribe(data => {
      this.movies = data;
    });
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

 
}
