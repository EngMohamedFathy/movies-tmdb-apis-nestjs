
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../../entities/movie.entity';
import { Genre } from '../../entities/genre.entity';

@Injectable()
export class MoviesSyncService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepo: Repository<Movie>,

    @InjectRepository(Genre)
    private readonly genreRepo: Repository<Genre>,
  ) {}

  async syncMoviesFromTmdbToDb(movies: any[]) {
    for (const movie of movies) {
      const movieEntity = new Movie();

      movieEntity.tmdbId = movie.id;
      movieEntity.title = movie.title;
      movieEntity.overview = movie.overview;
      movieEntity.posterPath = movie.poster_path;
      movieEntity.voteAverage = movie.vote_average;
      movieEntity.voteCount = movie.vote_count;

      // Map genre IDs
      if (movie.genre_ids && movie.genre_ids.length > 0) {
        movieEntity.genres = await this.genreRepo.findByIds(movie.genre_ids);
      } else {
        movieEntity.genres = [];
      }

      const existing = await this.movieRepo.findOne({ where: { tmdbId: movie.id } });

      if (!existing) {
        await this.movieRepo.save(movieEntity);
      }
    }
  }
}
