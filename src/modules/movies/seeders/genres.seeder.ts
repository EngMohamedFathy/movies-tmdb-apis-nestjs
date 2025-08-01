import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Genre } from '../entities/genre.entity';

@Injectable()
export class GenresSeeder {
  constructor(
    @InjectRepository(Genre) private genreRepo: Repository<Genre>,
  ) {}

  async seed() {
    console.log('Seeding Genres...');

    const genres = this.genreRepo.create([
      { name: 'Action Test' },
      { name: 'Romance Test' },
      { name: 'Comedy Test' },
      { name: 'Thriller Test' },
      { name: 'Drama Test' },
      { name: 'Sci-Fi Test' },
      { name: 'Horror Test' },
      { name: 'Documentary Test' },
    ]);

    await this.genreRepo.save(genres);

    console.log('Genres seeded.');
  }
}
