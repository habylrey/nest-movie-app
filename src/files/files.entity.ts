import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Grades } from '../grades/grades.entity';
import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
@Entity({ name: 'files' })
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bucket: number;

  @Column({name: 'file_size'})
  fileSize: number;

  @Column({name: 'file_name'})
  fileName: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date; 


}