import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Rating } from '../../../movies/entities/rating.entity';
import { Watchlist } from '../../../movies/entities/watchlist.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Rating, rating => rating.client)
  ratings: Rating[];

  @OneToMany(() => Watchlist, watchlist => watchlist.client)
  watchlist: Watchlist[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
