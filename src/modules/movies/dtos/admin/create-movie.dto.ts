import { IsOptional, IsString, IsInt, IsDateString, IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({
    description: 'Title of the movie',
    example: 'Inception',
  })
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  overview?: string;

  @IsOptional()
  @IsDateString()
  releaseDate?: string;

  @IsOptional()
  @IsString()
  posterPath?: string;

  @IsOptional()
  @IsNumber()
  voteAverage?: number;

  @IsOptional()
  @IsInt()
  voteCount?: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  genreIds?: number[];
}
