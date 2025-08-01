
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between, In } from 'typeorm';
import { Watchlist } from '../../entities/watchlist.entity';
import { FilterMovieDto } from '../../dtos/client/filter-movie.dto';
import { Movie } from '../../entities/movie.entity';
import { Rating } from '../../entities/rating.entity';
import { AddWatchlistMovieDto } from '../../dtos/client/add-wishlist-movie.dto';
import { RateMovieDto } from '../../dtos/client/rate-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private movieRepo: Repository<Movie>,
    @InjectRepository(Watchlist) private watchListRepo: Repository<Watchlist>,
    @InjectRepository(Rating) private ratingRepo: Repository<Rating>,
  ) {}

  // List movies by filter
  async listMovies(query: FilterMovieDto) {
    const { search, genreIds, page = 1, limit = 10 } = query;
    const where: any = {};

    if (search) {
      where.title = Like(`%${search}%`);
    }

    if (genreIds && genreIds.length) {
      where.genres = {
        id: In(genreIds),
      };
    }

    const [items, total] = await this.movieRepo.findAndCount({
      relations: ['genres'],
      where,
      take: limit,
      skip: (page - 1) * limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data: items,
      total,
      page,
      pageCount: Math.ceil(total / limit),
    };
  }

  // Get Movie by slug
  async getBySlug(slug: string) {
    const movie = await this.movieRepo.findOne({ relations: ['genres'], where: { slug: slug } });

    // check if found
    if (!movie) throw new NotFoundException(`Movie with Slug ${slug} not found`);

    return movie;
  }

  // Add movie to watchlist
  async addMovieToWatchlist(clientId: number, dto: AddWatchlistMovieDto) {
    const watchlistMovie = this.watchListRepo.create({ client: { id: clientId }, movie: { id: dto.movieId } });

    return this.watchListRepo.save(watchlistMovie);
  }

  // Rate Movie
  async rateMovie(clientId: number, dto: RateMovieDto) {
    const existing = await this.ratingRepo.findOne({
      where: { client: { id: clientId }, movie: { id: dto.movieId } },
    });

    if (existing) {
      existing.value = dto.rating;
      await this.ratingRepo.save(existing);
    } else {
      await this.ratingRepo.save({
        value: dto.rating,
        user: { id: clientId },
        movie: { id: dto.movieId },
      });
    }

    // Update average rating
    const ratings = await this.ratingRepo.find({ where: { movie: { id: dto.movieId } } });
    const avg = ratings.reduce((sum, r) => sum + r.value, 0) / ratings.length;

    await this.movieRepo.update(dto.movieId, {
      averageRating: avg,
      ratingCount: ratings.length,
    });

    return { averageRating: avg, totalRatings: ratings.length };
  }
}