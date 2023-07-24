import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, Params } from '@angular/router';

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
  isLoading:boolean = false;

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
  isFormatCollapsed: boolean = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isMoviesRoute = this.route.snapshot.url[0].path === 'movies';
    this.route.queryParams.subscribe((queryParams: Params) => {
      const title = queryParams['title'] || '';
      this.currentPage = parseInt(queryParams['page']) || 1;
      const languageFilter = queryParams['language'] || ''; // Get the language filter value
      const genreFilter = queryParams['genre'] || ''; // Get the genre filter value
      this.fetchMovies(title, languageFilter, genreFilter);
    });
  }

  fetchMovies(title: string, languageFilter: string, genreFilter: string): void {
    this.isLoading = true
    let apiUrl = `https://bookevent.onrender.com/movies?page=${this.currentPage}&page_size=${this.itemsPerPage}&title=${title}`;

    // Add language filter to the API URL if a language is selected
    if (languageFilter) {
      apiUrl += `&language=${languageFilter}`;
    }

    // Add genre filter to the API URL if a genre is selected
    if (genreFilter) {
      apiUrl += `&genre=${genreFilter}`;
    }

    this.http.get<Movie[]>(apiUrl).subscribe(
      (response) => {
        this.isLoading = false
        this.movies = response;
      },
      (error: any) => {
        this.isLoading = false
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

  updateUrlParams() {
    const queryParams = { page: this.currentPage };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
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
      case 'format':
        this.isFormatCollapsed = !this.isFormatCollapsed;  
        break;
      case 'releaseDate':
        this.isReleaseDateCollapsed = !this.isReleaseDateCollapsed;
        break;
      default:
        break;
    }
  }

  filterByLanguage(language: string): void {
    // Update the URL with the selected language filter
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { language: language },
      queryParamsHandling: 'merge'
    });

    // Fetch movies with updated language filter
    this.fetchMovies('', language, '');
  }

  filterByGenre(genre: string): void {
    // Update the URL with the selected genre filter
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { genre: genre },
      queryParamsHandling: 'merge'
    });

    // Fetch movies with updated genre filter
    this.fetchMovies('', '', genre);
  }

  redirectToShows(movieId: string, moviePoster: string, movieName: string) {
    // Append the movie ID, poster URL, and movie name as query parameters in the URL and navigate to the "shows" route
    this.router.navigate(['/shows'], { queryParams: { movie_id: movieId, poster: moviePoster, title: movieName } });
  }

  
}