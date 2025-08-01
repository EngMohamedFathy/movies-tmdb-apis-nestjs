import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TmdbIntegration {
  private readonly baseUrl =  process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
  private readonly bearerToken = process.env.TMDB_TOKEN || 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmQ4M2M2MzcxODJhNDQ3OTBlYmQyNTc0MWMwMWEyNyIsIm5iZiI6MTc1MzgyNDcxNC4yMzEsInN1YiI6IjY4ODkzZGNhZDVmNGY5ZTUyMTY5NDI1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oWi2Knb4f0jQaJ0N0vYU6pDV8AXXQStJbCcZwb3VE5M';

  constructor(private readonly http: HttpService) {}

  private commonHeaders() {
    return {
      Authorization: `Bearer ${this.bearerToken}`,
      Accept: 'application/json',
    };
  }

  async getGenres(): Promise<any[]> {
    const response = await firstValueFrom(
      this.http
        .get(`${this.baseUrl}/genre/movie/list?language=en-US`, {
          headers: this.commonHeaders(),
        })
        .pipe(
          catchError(err => {
            throw new Error(`TMDB getGenres failed with status ${err?.response?.status}`);
          }),
        ),
    );
    return response.data.genres;
  }

  async getPopularMovies(page = 1): Promise<any[]> {
    const response = await firstValueFrom(
      this.http
        .get(`${this.baseUrl}/movie/popular?language=en-US&page=${page}`, {
          headers: this.commonHeaders(),
        })
        .pipe(
          catchError(err => {
            throw new Error(`TMDB getPopularMovies page ${page} failed: ${err?.message}`);
          }),
        ),
    );
    return response.data.results;
  }
}
