/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsNumber, IsDate } from 'class-validator';

export class CreateMenuDto {
  @IsNumber()
  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
    name: 'userId',
  })
  userId: number;

  @IsString()
  @ApiProperty({
    required: true,
    nullable: false,
    name: 'name',
  })
  name: string;

  @IsDate()
  @ApiProperty({
    type: Date,
    required: true,
    nullable: false,
    name: 'dateStart',
  })
  dateStart: Date;

  @IsDate()
  @ApiProperty({
    type: Date,
    required: true,
    nullable: false,
    name: 'dateEnd',
  })
  dateEnd: Date;

  @IsArray()
  @IsNumber({}, { each: true })
  @ApiProperty({
    type: [Number],
    required: true,
    nullable: false,
    name: 'recipesId',
  })
  recipesId: number[];
}
