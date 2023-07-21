// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { ActivatedRoute, Router } from '@angular/router';

// interface Movie {
//   description: string;
//   duration: string;
//   genre: string;
//   id: string;
//   language: string;
//   poster: string;
//   releaseDate: string;
//   title: string;
// }

// @Component({
//   selector: 'app-movies',
//   templateUrl: './movies.component.html',
//   styleUrls: ['./movies.component.css']
// })
// export class MoviesComponent implements OnInit {
//   movies: Movie[] = [];
//   currentPage: number = 1;
//   totalPages: number = 10;
//   itemsPerPage: number = 12;
//   isMoviesRoute: boolean = false;

//   isFilterCollapsed: { [key: string]: boolean } = {
//     language: false,
//     genres: false,
//     rating: false,
//     releaseDate: false
//   };

//   isLanguageCollapsed: boolean = false;
//   isGenresCollapsed: boolean = false;
//   isRatingCollapsed: boolean = false;
//   isReleaseDateCollapsed: boolean = false;

//   constructor(
//     private http: HttpClient,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.isMoviesRoute = this.route.snapshot.url[0].path === 'movies';
//     this.fetchMovies();
//   }

//   fetchMovies(): void {
//     const apiUrl = `http://127.0.0.1:5000/movies?page=${this.currentPage}&page_size=${this.itemsPerPage}`;
//     this.http.get<Movie[]>(apiUrl).subscribe(
//       (response) => {
//         this.movies = response;
//       },
//       (error: any) => {
//         console.error('Error fetching movies data:', error);
//       }
//     );
//   }

//   onPageChanged(newPage: number): void {
//     if (newPage >= 1 && newPage <= this.totalPages) {
//       this.currentPage = newPage;
//       this.fetchMovies();
//     }
//   }

//   toggleFilter(filterName: string): void {
//     this.isFilterCollapsed[filterName] = !this.isFilterCollapsed[filterName];
//   }

 
// }



import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

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
  currentPage: number = 1;
  totalPages: number = 10;
  itemsPerPage: number = 12;
  isMoviesRoute: boolean = false;

  isFilterCollapsed: { [key: string]: boolean } = {
    language: false,
    genres: false,
    rating: false,
    releaseDate: false
  };

  isLanguageCollapsed: boolean = false;
  isGenresCollapsed: boolean = false;
  isRatingCollapsed: boolean = false;
  isReleaseDateCollapsed: boolean = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isMoviesRoute = this.route.snapshot.url[0].path === 'movies';
    this.route.queryParams.subscribe((queryParams) => {
      const title = queryParams['title'] || '';
      this.currentPage = parseInt(queryParams['page']) || 1;
      this.fetchMovies(title);
    });
  }

  fetchMovies(title: string): void {
    const apiUrl = `http://127.0.0.1:5000/movies?page=${this.currentPage}&page_size=${this.itemsPerPage}&title=${title}`;
    this.http.get<Movie[]>(apiUrl).subscribe(
      (response) => {
        this.movies = response;
      },
      (error: any) => {
        console.error('Error fetching movies data:', error);
      }
    );
  }

  onPageChanged(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.updateUrlParams();
    }
  }

  toggleFilter(filterName: string): void {
    this.isFilterCollapsed[filterName] = !this.isFilterCollapsed[filterName];
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
