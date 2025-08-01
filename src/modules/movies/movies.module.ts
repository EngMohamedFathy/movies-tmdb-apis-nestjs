
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Genre } from './entities/genre.entity';
import { Rating } from './entities/rating.entity';
import { HttpModule } from '@nestjs/axios';
import { ClientModule } from '../users/client/client.module';
import { AdminModule } from '../users/admin/admin.module';
import { MoviesController as AdminMovieController } from './controllers/admin/movies.controller';
import { MoviesService as AdminMovieService } from './services/admin/movies.service';
import { MoviesController as ClientMovieController } from './controllers/client/movies.controller';
import { MoviesService as ClientMovieService } from './services/client/movies.service';
import { Watchlist } from './entities/watchlist.entity';
import { AuthModule } from '../users/auth/auth.module';
import { GenresController } from './controllers/lookups/genres.controller';
import { GenresService } from './services/lookups/genres.service';
import { CacheModule } from '../../shared/cache/cache.module';
import { TmdbJobService } from './jobs/tmdb-sync.job';
import { GenresSyncService } from './integrations/tmdb/genres-sync.service';
import { MoviesSyncService } from './integrations/tmdb/movies-sync.service';
import { TmdbIntegration } from './integrations/tmdb/tmdb.integration';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie, Genre, Rating, Watchlist]),
    HttpModule,
    ClientModule,
    AdminModule,
    CacheModule
  ],
  controllers: [AdminMovieController, ClientMovieController, GenresController],
  providers: [AdminMovieService, ClientMovieService, GenresService, TmdbIntegration, TmdbJobService, GenresSyncService, MoviesSyncService],
  exports: [AdminMovieService, ClientMovieService],
})
export class MoviesModule {}