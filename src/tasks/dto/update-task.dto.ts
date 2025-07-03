import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsISO8601 } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({ description: 'The title of the task', required: false })
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'The description of the task', required: false })
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'The date when the task was requested (ISO8601)',
    example: '2025-06-26T15:30:00.000Z',
  })
  @IsOptional()
  @IsISO8601()
  date?: Date;
}
