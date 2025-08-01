
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between, In } from 'typeorm';
import { Genre } from '../../entities/genre.entity';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre) private genreRepo: Repository<Genre>,
  ) {}

  // List Genres
  async listGenres(filter: any = null) {
    return this.genreRepo.find();
  }
}