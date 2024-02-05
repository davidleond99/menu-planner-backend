/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateIngredientDto {
  @IsString()
  @ApiProperty({
    required: true,
    nullable: false,
    name: 'name',
  })
  name: string;
  @IsString()
  @ApiProperty({
    required: true,
    nullable: false,
    name: 'category',
  })
  category: string;
  @IsString()
  @ApiProperty({
    required: true,
    nullable: false,
    name: 'unity',
  })
  unity: string;
}
