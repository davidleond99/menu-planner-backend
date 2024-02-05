/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { RecipeService } from 'src/recipe/recipe.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  private readonly logger = new Logger('MenuService');
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    private readonly recipeService: RecipeService,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    try {
      const menu = this.menuRepository.create(createMenuDto);
      const recipesId = createMenuDto.recipesId;
      const recipe = await this.recipeService.findByIds(recipesId);
      menu.recipes = recipe;
      await this.menuRepository.save(menu);

      return menu;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll() {
    try {
      return this.menuRepository.find({ relations: { recipes: true } });
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOne(name: string) {
    const recipe = await this.menuRepository.findOneBy({
      name: name,
      recipes: true,
    });

    if (!recipe) throw new NotFoundException(`Recipe with ${name} not found`);

    return recipe;
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const menu = await this.menuRepository.preload({
      id: +id,
      ...updateMenuDto,
    });

    if (!menu) throw new NotFoundException(`menu with id: ${id} not found`);

    try {
      await this.menuRepository.save(menu);
      return menu;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(name: string) {
    const menu = await this.findOne(name);
    await this.menuRepository.remove(menu);
  }

  private handleDBExceptions(error: any) {
    if (error.id === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
