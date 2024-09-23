import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity({ name: 'movies' })  
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({name: 'poster_file_id'})
  posterFileId: number;

  @Column({name: 'director_id'})
  directorId: number;

  @Column({name: 'genre_id'})
  genreId: number;

  @Column()
  link: string;

  @ManyToOne('Genres', 'movies')
  @JoinColumn({ name: 'genre_id' })
  genre: any;

  @ManyToOne('Directors', 'movies')
  @JoinColumn({ name: 'director_id' })
  director: any;

  @OneToMany('Grades', 'movie')
  grades: any[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date; 
  
  @OneToMany('Favorites', 'movie')
  favorites: any[];
}