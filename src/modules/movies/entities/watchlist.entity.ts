import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Movie } from './movie.entity';
import { Client } from '../../users/client/entities/client.entity';

@Entity()
export class Watchlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isFavorite: boolean;

  @ManyToOne(() => Movie, movie => movie.watchlists)
  movie: Movie;

  @ManyToOne(() => Client, client => client.watchlist)
  client: Client;
}