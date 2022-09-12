import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'secretNotes' })
export class SecretNote extends Model {
  @ApiProperty()
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @ApiProperty()
  @Column
  encrypted!: string;

  @ApiProperty()
  content: string;
}
