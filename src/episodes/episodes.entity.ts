import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity({ name: 'episodes' })
export class Episodes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'preview_file_id' })
  previewFileId: number;

  @Column({ name: 'series_id' })
  seriesId: number;

  @Column()
  season: number;

  @Column()
  episode: number;

  @Column({ name: 'episode_link' })
  episodeLink: string;

  @Column()
  description: string;

  @Column()
  name: string;

  @ManyToOne('Series', 'episodes')
  @JoinColumn({ name: 'series_id' })
  series: any;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date; 
}