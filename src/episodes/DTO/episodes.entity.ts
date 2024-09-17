import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'episodes' })  
export class Episodes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  preview_file_id: number;

  @Column()
  series_id: number;

  @Column()
  season: number;

  @Column()
  episode: number;

  @Column()
  episode_link: string;

  @Column()
  description: string;

  @Column()
  name: string;

}