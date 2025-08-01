
import { Controller, Get, Post, Body, Param, Query, UseGuards, } from '@nestjs/common';
import { MoviesService } from '../../services/client/movies.service';
import { FilterMovieDto } from '../../dtos/client/filter-movie.dto';
import { AddWatchlistMovieDto } from '../../dtos/client/add-wishlist-movie.dto';
import { RateMovieDto } from '../../dtos/client/rate-movie.dto';
import { AuthPayload, CurrentUser } from '../../../users/auth/decorators/current-user.decorator';
import { responseSuccess } from '../../../../common/helpers/response.helper';
import { ClientAuthGuard } from '../../../users/auth/guards/client-auth.guard';
import { Movie } from '../../entities/movie.entity';
import { CacheContext } from '../../../../shared/cache/cache.context';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Client APIs')
@Controller('client/movies')
export class MoviesController {
  constructor(private readonly service: MoviesService, private readonly cacheService: CacheContext) {}

  @Get()
  async listMovies(@Query() filter: FilterMovieDto) {
    // create filter object as string key
    const cacheKey = `movies:list:${JSON.stringify(filter)}`;

    // get cached value
    const cached = await this.cacheService.get<Movie>(cacheKey);
    console.log(cached);
    if (cached) return cached;

    const movies = await this.service.listMovies(filter);

    // store in cache
    if (movies) await this.cacheService.set(cacheKey, movies, 300);

    return responseSuccess('success',movies);
  }

  @Get(':slug')
  async getBySlug(@Param('slug') slug: string) {
    // create filter object as string key
    const cacheKey = `movies:details:${slug}`;

    // get cached value
    const cached = await this.cacheService.get<Movie>(cacheKey);
    if (cached) return cached;

    const movie = await this.service.getBySlug(slug);

    // store in cache
    if (movie) await this.cacheService.set(cacheKey, movie, 300);

    return responseSuccess('success',movie);
  }

  @ApiBearerAuth('bearerAuth')
  @Post('watchlist')
  @UseGuards(ClientAuthGuard) // example, inject current users
  async addToWatchlist(@Body() dto: AddWatchlistMovieDto, @CurrentUser() authPayload: AuthPayload) {
    const watchListMovie = await this.service.addMovieToWatchlist(authPayload.userId, dto);

    return responseSuccess('success',watchListMovie);
  }

  @ApiBearerAuth('bearerAuth')
  @Post('rating')
  @UseGuards(ClientAuthGuard)
  async rateMovie(@Body() dto: RateMovieDto, @CurrentUser() authPayload: AuthPayload) {
    const ratedMovie= await this.service.rateMovie(authPayload.userId, dto);

    return responseSuccess('success',ratedMovie);
  }
}
