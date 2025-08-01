import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { AdminSeeder } from '../modules/users/admin/admin.seeder';
import { ClientSeeder } from '../modules/users/client/client.seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../modules/users/admin/entities/admin.entity';
import { Client } from '../modules/users/client/entities/client.entity';
import { GenresSeeder } from '../modules/movies/seeders/genres.seeder';
import { Genre } from '../modules/movies/entities/genre.entity';
import { AppDataSource } from '../data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot({...AppDataSource.options}),
    TypeOrmModule.forFeature([Admin, Client, Genre])
  ],
  providers: [
    SeederService,
    AdminSeeder,
    ClientSeeder,
    GenresSeeder,
  ]
})
export class SeederModule {}
