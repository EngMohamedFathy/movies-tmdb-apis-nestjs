import { Injectable } from '@nestjs/common';
import { AdminSeeder } from '../modules/users/admin/admin.seeder';
import { ClientSeeder } from '../modules/users/client/client.seeder';
import { GenresSeeder } from '../modules/movies/seeders/genres.seeder';

@Injectable()
export class SeederService {
  constructor(
    private adminSeeder: AdminSeeder,
    private clientSeeder: ClientSeeder,
    private genresSeeder: GenresSeeder,
  ) {}

  async seed(modules?: string[]) {
    console.log('Starting seeding…');

    if (!modules || modules.includes('admin')) {
      await this.adminSeeder.seed();
    }
    if (!modules || modules.includes('client')) {
      await this.clientSeeder.seed();
    }

    if (!modules || modules.includes('lookups')) {
      await this.genresSeeder.seed();
    }

    console.log('Seeding finished.');
  }
}
