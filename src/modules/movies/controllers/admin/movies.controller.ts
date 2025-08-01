
import {
  Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards,
} from '@nestjs/common';

import { MoviesService as AdminMovieService } from '../../services/admin/movies.service';
import { CreateMovieDto } from '../../dtos/admin/create-movie.dto';
import { UpdateMovieDto } from '../../dtos/admin/update-movie.dto';
import { responseSuccess } from '../../../../common/helpers/response.helper';
import { FilterMovieDto } from '../../dtos/admin/filter-movie.dto';
import { AuthPayload, CurrentUser } from '../../../users/auth/decorators/current-user.decorator';
import { AdminAuthGuard } from '../../../users/auth/guards/admin-auth.guard';
import { CacheContext } from '../../../../shared/cache/cache.context';
import { TmdbJobService } from '../../jobs/tmdb-sync.job';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin APIs')
@Controller('admin/movies')
@UseGuards(AdminAuthGuard)
export class MoviesController {
  constructor(private readonly adminMovieService: AdminMovieService, private readonly cacheService: CacheContext, private readonly syncJob: TmdbJobService) {}

  @ApiBearerAuth('bearerAuth')
  @ApiOperation({ summary: 'Create New Movie' })
  @ApiResponse({ status: 200, description: 'Create Movie', type: CreateMovieDto })
  @Post()
  async create(@Body() dto: CreateMovieDto, @CurrentUser() authPayload: AuthPayload) {
    // const loggedAdmin = await this.currentUserService.getEntity(authPayload);

    const createdMovie = await this.adminMovieService.create(dto,authPayload.userId);

    // clear cached lists
    await this.cacheService.deleteByPattern('movies:list:*');

    return responseSuccess('success',createdMovie);
  }

  @Get()
  async listMovies(@Query() query: FilterMovieDto) {
    const movies =  await this.adminMovieService.listMovies(query);

    return responseSuccess('success',movies);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const movie = await this.adminMovieService.findOne(id);

    return responseSuccess('success',movie);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateMovieDto) {
    const movie = await this.adminMovieService.update(id, dto);

    // clear cached lists
    await this.cacheService.deleteByPattern(`movies:details:${movie.slug}`);

    return responseSuccess('success',movie);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const deletedMovie = await this.adminMovieService.remove(id);

    // clear cached lists
    await this.cacheService.deleteByPattern(`movies:details:${deletedMovie.slug}`);

    return responseSuccess('success',deletedMovie);
  }

  @Post('tmdb/sync')
  async manualSync() {
    await this.syncJob.handleCron();
    return { message: 'TMDB data synced manually.' };
  }
}
