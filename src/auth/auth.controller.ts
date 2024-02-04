import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponse } from './dto/login.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'Login',
    type: LoginResponse,
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
