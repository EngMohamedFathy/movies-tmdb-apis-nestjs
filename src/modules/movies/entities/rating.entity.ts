import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Movie } from './movie.entity';
import { Client } from '../../users/client/entities/client.entity';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  value: number;

  @ManyToOne(() => Movie, movie => movie.ratings)
  movie: Movie;

  @ManyToOne(() => Client, client => client.ratings)
  client: Client;
}