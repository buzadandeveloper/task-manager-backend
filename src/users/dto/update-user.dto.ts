import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: 'The name of the user', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'The email of the user', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: 'The password of the user', required: false })
  @IsString()
  @IsOptional()
  password?: string;
}
