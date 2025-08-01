
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from '../../entities/movie.entity';
import { DeepPartial, In, Like, Repository } from 'typeorm';
import { CreateMovieDto } from '../../dtos/admin/create-movie.dto';
import { UpdateMovieDto } from '../../dtos/admin/update-movie.dto';
import { FilterMovieDto } from '../../dtos/admin/filter-movie.dto';
import { Genre } from '../../entities/genre.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepo: Repository<Movie>,
    @InjectRepository(Genre)
    private readonly genreRepo: Repository<Genre>,
  ) {}

  // Create Movie
  async create(dto: CreateMovieDto, admin: any) {
    const movie = this.movieRepo.create({
      ...dto,
      createdBy: admin,
    });

    // Set genres relation if provided
    if (Array.isArray(dto.genreIds) && dto.genreIds.length > 0) {
      movie.genres = await this.genreRepo.find({
        where: { id: In(dto.genreIds) },
      });
    }

    return this.movieRepo.save(movie);
  }

  // List All Movies
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

  // Get Movie By Id
  async findOne(id: number) {
    const movie = await this.movieRepo.findOne({ where: { id } });

    // check if found
    if (!movie) throw new NotFoundException(`Movie with ID ${id} not found`);

    return movie;
  }

  // Update Movie
  async update(id: number, dto: UpdateMovieDto) {
    const updatedMovie = await this.movieRepo.preload({
      id,
      ...dto,
    });

    // check if found
    if (!updatedMovie) throw new NotFoundException(`Movie with ID ${id} not found`);

    return this.movieRepo.save(updatedMovie);
  }

  // Remove Movie
  async remove(id: number) {
    const movie = await this.findOne(id);

    // check if found
    if (!movie) throw new NotFoundException(`Movie with ID ${id} not found`);

    return this.movieRepo.remove(movie);
  }
}
