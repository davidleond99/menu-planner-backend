/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { Menu } from 'src/menu/entities/menu.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('recipe')
export class Recipe {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;
  @ApiProperty()
  @Column('text', { nullable: false, default: '', unique: true })
  name: string;
  @ApiProperty()
  @Column('text', { nullable: false, default: '' })
  instructions: string;

  @ManyToMany(() => Ingredient, (ingredient) => ingredient.recipes)
  @JoinTable({
    name: 'recipe_ingredients',
    joinColumn: {
      name: 'recipe_id',
    },
    inverseJoinColumn: {
      name: 'ingredient_id',
    },
  })
  ingredients: Ingredient[];

  @ManyToMany(() => Menu, (menus) => menus.recipes)
  menus: Menu[];
}
