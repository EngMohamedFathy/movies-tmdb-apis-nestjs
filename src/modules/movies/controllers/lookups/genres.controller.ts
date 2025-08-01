
import { Controller, Get, Post, Body, Param, Query, UseGuards, } from '@nestjs/common';
import { GenresService } from '../../services/lookups/genres.service';
import { responseSuccess } from '../../../../common/helpers/response.helper';

@Controller('lookups/genres')
export class GenresController {
  constructor(private readonly service: GenresService) {}

  @Get()
  async getMovies(@Query() filter: any) {
    const genres = await this.service.listGenres(filter);

    return responseSuccess("success", genres);
  }

}
