import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'series' })  
export class Series {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  poster_file_id: number;

  @Column()
  start_year: number;

  @Column()
  grad_year: number;

  @Column()
  genre_id: number;
}