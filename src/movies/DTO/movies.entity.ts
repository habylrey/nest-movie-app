import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'movies' })  
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

//   @Column()
//   duration_min: string;

  @Column()
  description: string;

  @Column()
  poster_file_id: number;

  @Column()
  director_id: number;

  @Column()
  genre_id: number;

  @Column()
  link: string;
}