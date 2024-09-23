import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'directors' })
export class Directors {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'director_photo_id' })
  directorPhotoId: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany('Movie', 'director')
  movies: any[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date; 
}