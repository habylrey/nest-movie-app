import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'directors' })  
export class Directors {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  director_photo_id: number;

  @Column()
  name: string;

  @Column()
  description: string;

}