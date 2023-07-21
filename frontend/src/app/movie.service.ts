import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://127.0.0.1:5000/movies';
  private pageSize = 12;

  constructor(private http: HttpClient) { }

  getMovies(page: number): Observable<Movie[]> {
    const params = new HttpParams().set('page', page.toString()).set('page_size', this.pageSize.toString());
    return this.http.get<Movie[]>(this.apiUrl, { params });
  }
}
