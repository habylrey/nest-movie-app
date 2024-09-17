import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'grades' })  
export class Grades {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  grade: number;

  @Column({ nullable: true })
  movie_id: number | null;

  @Column({ nullable: true })
  series_id: number | null;

  @Column()
  user_id: number;
}