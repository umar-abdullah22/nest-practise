import { IsString } from 'class-validator';

export class TaskDto {
  id: number;
  @IsString()
  title: string;
  @IsString()
  description: string;
}
