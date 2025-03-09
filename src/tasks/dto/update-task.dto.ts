import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({ description: 'The title of the task', required: false })
  title?: string;

  @ApiProperty({ description: 'The description of the task', required: false })
  description?: string;

  @ApiProperty({
    description: 'The status of the task',
    example: '0: To do, 1: In progress, 2: Completed',
    required: false,
  })
  @IsNumber()
  status?: number;
}
