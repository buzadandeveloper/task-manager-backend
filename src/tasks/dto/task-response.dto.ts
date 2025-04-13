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

  @ApiProperty({ nullable: true, description: 'Time when task started' })
  startTime?: Date;

  @ApiProperty({ nullable: true, description: 'Time when task was completed' })
  endTime?: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
