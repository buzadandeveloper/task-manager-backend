import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../enum/task.enum';

export class TaskResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({
    description:
      'The status of the task. Enum values: 0 = ToDo, 1 = InProgress, 2 = Completed',
    enum: TaskStatus,
    enumName: 'TaskStatus',
    example: TaskStatus.ToDo,
  })
  status: TaskStatus;

  @ApiProperty({
    description: 'The date when the task was requested (ISO8601)',
    example: '2025-06-26T15:30:00.000Z',
  })
  date: Date;
}
