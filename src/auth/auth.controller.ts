/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponse } from './dto/login.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
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

  @ApiResponse({
    status: 201,
    description: 'User creado',
  })
  @Post()
  create(@Body() registerDto: RegisterDto) {
    return this.authService.create(registerDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Menu encontrado',
  })
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @ApiResponse({
    status: 201,
    description: 'Menu encontrado',
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.authService.findOne(id);
  }
}
