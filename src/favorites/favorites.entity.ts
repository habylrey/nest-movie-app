import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'favorites' })  
export class Favorites {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne('Movie', 'favorites', { nullable: true })
  @JoinColumn({ name: 'movie_id' })
  movie: any | null;

  @ManyToOne('User', 'favorites')
  @JoinColumn({ name: 'user_id' })
  user: any;

  @ManyToOne('Series', 'favorites', { nullable: true })
  @JoinColumn({ name: 'series_id' })
  series: any | null;

  @ManyToOne('Grades', 'favorites')
  @JoinColumn({ name: 'grade_id' })
  grade: any;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date; 
}