// src/genres/genre.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from '../../entities/genre.entity';

@Injectable()
export class GenresSyncService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepo: Repository<Genre>,
  ) {}

  async syncGenresFromTmdbToDb(genres: { id: number; name: string }[]) {
    const transformedGenres = genres.map(g => ({
      tmdbId: g.id,
      name: g.name,
    }));

    await this.genreRepo.upsert(transformedGenres, ['tmdbId']);
  }
}
