import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  ManyToOne, BeforeInsert, BeforeUpdate, AfterLoad, Index, ManyToMany, JoinTable,
} from 'typeorm';
import { Genre } from './genre.entity';
import { Rating } from './rating.entity';
import { Watchlist } from './watchlist.entity';
import { Admin } from '../../users/admin/entities/admin.entity';
import slugify from 'slugify';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @Index({ unique: true })
  tmdbId: number;

  @Column()
  title: string;

  @Column()
  @Index({ unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  overview: string;

  @Column({ nullable: true })
  releaseDate: Date;

  @Column({ nullable: true })
  posterPath: string;

  @Column({ type: 'float', nullable: true })
  voteAverage: number;

  @Column({ nullable: true })
  voteCount: number;

  @Column({ nullable: true })
  averageRating: number;

  @Column({ nullable: true })
  ratingCount: number;

  @ManyToOne(() => Admin, admin => admin.movies ,{ nullable: true })
  @JoinColumn()
  createdBy: Admin;

  @ManyToMany(() => Genre, genre => genre.movie)
  @JoinTable()
  genres: Genre[];

  @OneToMany(() => Rating, rating => rating.movie)
  ratings: Rating[];

  @OneToMany(() => Watchlist, watchlist => watchlist.movie)
  watchlists: Watchlist[];

  @CreateDateColumn()
  createdAt: Date;

  // Hooks
  private originalTitle: string; // store old title

  @AfterLoad()
  private loadOriginalTitle() {
    this.originalTitle = this.title;
  }

  @BeforeInsert()
  generateSlugOnInsert() {
    this.generateSlug();
  }

  @BeforeUpdate()
  updateSlugIfTitleChanged() {
    if (this.title !== this.originalTitle) {
      this.generateSlug();
    }
  }

  generateSlug() {
    const baseSlug = slugify(this.title, { lower: true, strict: true });
    const random = Math.floor(10 + Math.random() * 90);
    this.slug = `${baseSlug}-${random}`;
  }

}