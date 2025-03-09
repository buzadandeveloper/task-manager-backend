import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ description: 'The title of the task' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The description of the task' })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The status of the task',
    example: '0: To do, 1: In progress, 2: Completed',
  })
  @IsNumber()
  status: number;

  @ApiProperty({
    description: 'The start time of the task',
    nullable: true,
    required: false,
  })
  @IsOptional()
  startTime?: Date;

  @ApiProperty({
    description: 'The end time of the task',
    nullable: true,
    required: false,
  })
  @IsOptional()
  endTime?: Date;
}
