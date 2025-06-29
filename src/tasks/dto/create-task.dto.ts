import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsISO8601 } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ description: 'The title of the task' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The description of the task' })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The date when the task was requested',
    example: '2025-06-26T15:30:00.000Z',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsISO8601()
  date?: string;
}
