import { ApiProperty } from '@nestjs/swagger';

export class TaskResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  status: number;

  @ApiProperty({ nullable: true, description: 'Time when task started' })
  startTime?: Date;

  @ApiProperty({ nullable: true, description: 'Time when task was completed' })
  endTime?: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
