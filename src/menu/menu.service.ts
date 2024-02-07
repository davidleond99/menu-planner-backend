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
  findByUserId(userId: number) {
    try {
      return this.menuRepository.find({
        relations: { recipes: { ingredients: true } },
        where: { userId: +userId },
      });
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll() {
    try {
      return this.menuRepository.find({
        relations: { recipes: { ingredients: true } },
      });
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOne(id: number) {
    const recipe = await this.menuRepository.findOne({
      relations: { recipes: { ingredients: true } },
      where: { id: +id },
    });

    if (!recipe) throw new NotFoundException(`Recipe with ${id} not found`);

    return recipe;
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const recipesId = updateMenuDto.recipesId;
    const recipes = await this.recipeService.findByIds(recipesId!);
    const menu = await this.menuRepository.preload({
      id: +id,
      ...updateMenuDto,
      recipes: recipes,
    });

    if (!menu) throw new NotFoundException(`menu with id: ${id} not found`);

    try {
      await this.menuRepository.save(menu);
      return menu;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const menu = await this.findOne(id);
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
