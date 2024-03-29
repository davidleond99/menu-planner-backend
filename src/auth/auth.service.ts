/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('ParticipanteService');
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto) {
    const { user_name, password } = loginDto;

    const user = await this.userRepository.findOneBy({
      user_name,
    });

    if (!user) throw new UnauthorizedException();

    if (password != user.password)
      throw new UnauthorizedException('Invalid Credentials');
    const payload = { sub: user.id, username: user.user_name };
    const { ...userValues } = user;
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: userValues,
    };
  }

  async create(registerDto: RegisterDto) {
    try {
      const user = this.userRepository.create(registerDto);
      await this.userRepository.save(user);

      return user;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }

  findAll() {
    try {
      return this.userRepository.find({});
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOne(id: number) {
    const recipe = await this.userRepository.findOne({
      where: { id: +id },
    });

    if (!recipe) throw new NotFoundException(`Recipe with ${id} not found`);

    return recipe;
  }
}
