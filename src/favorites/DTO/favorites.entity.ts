import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'favorites' })  
export class Favorites {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  movie_id: number | null;

  @Column()
  user_id: number;

  @Column({ nullable: true })
  series_id: number | null;

  @Column()
  grade_id: number;

}