import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Grades } from '../grades/grades.entity';
import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
// import { Favorites } from 'src/favorites/favorites.entity';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true, name: 'user_pic_id' })
  userPicId: number | null;

  @OneToMany(() => Grades, grade => grade.user)
  grades: Grades[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date; 

  // @OneToMany(() => Favorites, favorite => favorite.user_)
  // favorites: Favorites[];

}