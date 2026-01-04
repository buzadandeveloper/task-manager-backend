import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  provider: string;

  @ApiProperty({ required: false, nullable: true })
  avatar?: string | null;

  @ApiProperty()
  createdAt: Date;
}
