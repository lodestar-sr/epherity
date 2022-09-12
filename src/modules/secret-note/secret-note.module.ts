import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { SecretNote } from '@modules/secret-note/entities/secret-note.entity';
import { SecretNoteService } from '@modules/secret-note/secret-note.service';
import { SecretNoteController } from '@modules/secret-note/secret-note.controller';

@Module({
  imports: [SequelizeModule.forFeature([SecretNote])],
  controllers: [SecretNoteController],
  providers: [SecretNoteService],
  exports: [SecretNoteService],
})
export class SecretNoteModule {}
