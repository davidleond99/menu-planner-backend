/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ingredient')
export class Ingredient {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;
  @ApiProperty()
  @Column('text', { nullable: false, default: '', unique: true })
  name: string;
  @ApiProperty()
  @Column('text', { nullable: false, default: '' })
  category: string;
  @ApiProperty()
  @Column('text', { nullable: false, default: '' })
  unity: string;

  @ManyToMany(() => Recipe, (recipes) => recipes.ingredients)
  recipes: Recipe[];
}
