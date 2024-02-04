import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class LoginDto {
  @IsString()
  @ApiProperty({
    required: true,
    name: 'user_name',
  })
  user_name: string;
  @IsString()
  @ApiProperty({
    required: true,
    name: 'password',
  })
  password: string;
}

export class LoginResponse {
  @ApiProperty()
  access_token: string;
  @ApiProperty()
  user: User;
}
