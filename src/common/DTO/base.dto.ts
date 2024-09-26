import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseDto {
  @ApiProperty({ description: 'Уникальный идентификатор', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({ description: 'Дата создания', example: '2023-05-01T12:00:00.000Z' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty({ description: 'Дата последнего обновления', example: '2023-05-01T12:00:00.000Z' })
  updatedAt: Date;

  @ApiProperty({ description: 'Дата удаления (если применимо)', example: '2023-05-01T12:00:00.000Z' })
  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
