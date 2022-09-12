import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSecretNoteDto {
  @IsString()
  @ApiProperty()
  readonly content: string;
}
