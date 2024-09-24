import { IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class IdDto {
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  id: number;
  constructor(id: number) {
    this.id = id;
  }
}