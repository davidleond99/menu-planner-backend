/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany } from 'typeorm';

@Entity('menu')
export class Menu {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'integer' })
  userId: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  name: string;

  @ApiProperty()
  @Column({ type: 'date', nullable: false })
  dateStart: Date;

  @ApiProperty()
  @Column({ type: 'date', nullable: false })
  dateEnd: Date;
  
  @ManyToMany(() => Recipe, (recipe) => recipe.menus)
  @JoinTable({
    name: 'menu_recipe',
    joinColumn: {
      name: 'menu_id',
    },
    inverseJoinColumn: {
      name: 'recipe_id',
    },
  })
  recipes: Recipe[];
}
