import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { CreateSecretNoteDto } from './dto/create-secret-note.dto';
import { UpdateSecretNoteDto } from './dto/update-secret-note.dto';
import { SecretNote } from './entities/secret-note.entity';
import { SECRET_NOT_NOT_FOUND } from '@shared/constants/strings.constants';
import { encrypt } from '@shared/helpers/encryption.helpers';

@Injectable()
export class SecretNoteService {
  constructor(
    @InjectModel(SecretNote)
    private readonly secretNoteModel: typeof SecretNote,
  ) {
  }

  async find(id: number) {
    const secretNote = await this.secretNoteModel.findByPk(id);
    if (!secretNote)
      throw new NotFoundException(SECRET_NOT_NOT_FOUND);
    return secretNote;
  }

  findOne(options?: FindOptions) {
    return this.secretNoteModel.findOne(options);
  }

  findMany(options?: FindOptions) {
    return this.secretNoteModel.findAll(options);
  }

  create(data: CreateSecretNoteDto) {
    return this.secretNoteModel.create({
      encrypted: encrypt(data.content),
    });
  }

  patch(secretNote: SecretNote, updates: UpdateSecretNoteDto) {
    return secretNote.update({
      encrypted: encrypt(updates.content),
    });
  }

  remove(secretNote: SecretNote) {
    return secretNote.destroy();
  }
}
