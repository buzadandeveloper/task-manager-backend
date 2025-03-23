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

  @ApiProperty({ required: false })
  avatar?: string;

  @ApiProperty()
  createdAt: Date;
}
