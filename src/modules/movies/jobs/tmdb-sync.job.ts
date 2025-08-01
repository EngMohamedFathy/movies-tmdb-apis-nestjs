
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TmdbIntegration } from '../integrations/tmdb/tmdb.integration';
import { MoviesSyncService } from '../integrations/tmdb/movies-sync.service';
import { GenresSyncService } from '../integrations/tmdb/genres-sync.service';


@Injectable()
export class TmdbJobService {
  private readonly logger = new Logger(TmdbJobService.name);

  constructor(
    private readonly tmdbIntegration: TmdbIntegration,
    private readonly movieService: MoviesSyncService,
    private readonly genreService: GenresSyncService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async handleCron() {
    this.logger.log('Starting daily TMDB sync...');

    try {
      await this.syncGenres();
      await this.syncMovies();
    } catch (error) {
      this.logger.error('TMDB sync failed:', error.message);
    }
  }

  async syncGenres() {
    const genres = await this.tmdbIntegration.getGenres();
    console.log(genres);
    await this.genreService.syncGenresFromTmdbToDb(genres);
    this.logger.log(`Synced ${genres.length} genres`);
  }

  async syncMovies() {
    const movies = await this.tmdbIntegration.getPopularMovies(2);
    console.log(movies);
    await this.movieService.syncMoviesFromTmdbToDb(movies);
    this.logger.log(`Synced ${movies.length} movies`);
  }
}
