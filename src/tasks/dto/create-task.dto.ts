import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../enum/task.enum';

export class CreateTaskDto {
  @ApiProperty({ description: 'The title of the task' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The description of the task' })
  @IsString()
  description: string;

  @ApiProperty({
    description:
      'The status of the task. Enum values: 0 = ToDo, 1 = InProgress, 2 = Completed',
    enum: TaskStatus,
    enumName: 'TaskStatus',
    example: TaskStatus.ToDo,
  })
  @IsEnum(TaskStatus)
  status: TaskStatus;

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
