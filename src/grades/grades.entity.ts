import { OneToMany, Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { BaseDto } from '../common/DTO/base.dto';

@Entity({ name: 'grades' })
export class Grades extends BaseDto{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  grade: number;

  @Column({ nullable: true, name: 'movie_id' })
  movieId: number | null;

  @Column({ nullable: true, name: 'series_id' })
  seriesId: number | null;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne('User', 'grades')
  @JoinColumn({ name: 'user_id' })
  user: any;

  @ManyToOne('Series', 'grades')
  @JoinColumn({ name: 'series_id' })
  series: any;

  @ManyToOne('Movie', 'grades')
  @JoinColumn({ name: 'movie_id' })
  movie: any;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date; 

  @OneToMany('Favorites', 'grade')
  favorites: any[];
}