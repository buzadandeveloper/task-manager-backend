import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../enum/task.enum';

export class UpdateTaskDto {
  @ApiProperty({ description: 'The title of the task', required: false })
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'The description of the task', required: false })
  @IsOptional()
  description?: string;

  @ApiProperty({
    description:
      'The status of the task. Enum values: 0 = ToDo, 1 = InProgress, 2 = Completed',
    enum: TaskStatus,
    enumName: 'TaskStatus',
    example: TaskStatus.ToDo,
    required: false,
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @ApiProperty({
    description: 'The date when the task was requested (ISO8601)',
    example: '2025-06-26T15:30:00.000Z',
  })
  date: Date;
}
