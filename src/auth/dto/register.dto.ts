/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  @ApiProperty({
    required: true,
    name: 'user_name',
  })
  user_name: string;
  @IsString()
  @ApiProperty({
    required: true,
    name: 'name',
  })
  name: string;
  @IsString()
  @ApiProperty({
    required: true,
    name: 'password',
  })
  password: string;
}
