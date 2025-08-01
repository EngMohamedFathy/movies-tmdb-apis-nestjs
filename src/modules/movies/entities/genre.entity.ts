import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index, ManyToMany } from 'typeorm';
import { Movie } from './movie.entity';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  @Index({ unique: true })
  tmdbId: number;

  @Column()
  name: string;

  @ManyToMany(() => Movie, movie => movie.genres)
  movie: Movie;
}