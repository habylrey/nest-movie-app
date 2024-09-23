import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity({ name: 'series' })
export class Series {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: 'poster_file_id', nullable: true })
  posterFileId: number;

  @Column({ name: 'start_year', nullable: true })
  startYear: number | null;

  @Column({ name: 'grad_year', nullable: true })
  gradYear: number | null;

  @Column({ name: 'genre_id', nullable: true })
  genreId: number | null;

  @OneToMany('Grades', 'series')
  grades: any[];

  @OneToMany('Episodes', 'series')
  episodes: any[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date; 

  @OneToMany('Favorites', 'series')
  favorites: any[];
}