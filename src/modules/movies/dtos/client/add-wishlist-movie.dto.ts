import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AddWatchlistMovieDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  movieId: number;
}
