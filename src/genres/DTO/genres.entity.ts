import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'genres' })  
export class Genres {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

}