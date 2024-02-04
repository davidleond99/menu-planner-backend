import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({
    type: 'number',
    example: 'number',
  })
  id: number;
  @Column('text', { nullable: false })
  @ApiProperty()
  name: string;
  @Column('text', { nullable: false })
  @ApiProperty()
  user_name: string;
  @Column('text', { nullable: false })
  password: string;
}
