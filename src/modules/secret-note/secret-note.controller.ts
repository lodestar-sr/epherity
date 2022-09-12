import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SecretNote } from '@modules/secret-note/entities/secret-note.entity';
import { SecretNoteService } from '@modules/secret-note/secret-note.service';
import { CreateSecretNoteDto } from '@modules/secret-note/dto/create-secret-note.dto';
import { UpdateSecretNoteDto } from '@modules/secret-note/dto/update-secret-note.dto';
import { decrypt } from '@shared/helpers/encryption.helpers';

@ApiTags('SecretNotes')
@Controller('secret-notes')
export class SecretNoteController {
  constructor(
    private readonly secretNoteService: SecretNoteService,
  ) {
  }

  @Get()
  @ApiResponse({ type: [SecretNote] })
  async list(@Query('encrypted') encrypted: boolean) {
    const notes = await this.secretNoteService.findMany();
    if (!encrypted) {
      notes.forEach((item) => {
        item.setDataValue('content', decrypt(item.encrypted));
        item.setDataValue('encrypted', undefined);
      });
    }
    return notes;
  }

  @Get(':id')
  @ApiResponse({ type: SecretNote })
  async find(@Param('id') id: string, @Query('encrypted') encrypted: boolean) {
    const note = await this.secretNoteService.find(+id);
    if (!encrypted) {
      note.setDataValue('content', decrypt(note.encrypted));
      note.setDataValue('encrypted', undefined);
    }
    return note;
  }

  @Post()
  @ApiResponse({ type: SecretNote })
  create(@Body() createSecretNoteDto: CreateSecretNoteDto) {
    return this.secretNoteService.create(createSecretNoteDto);
  }

  @Put(':id')
  @ApiResponse({ type: SecretNote })
  async update(@Param('id') id: string, @Body() updateSecretNote: UpdateSecretNoteDto) {
    const secretNote = await this.secretNoteService.find(+id);
    return this.secretNoteService.patch(secretNote, updateSecretNote);
  }

  @Delete(':id')
  @ApiResponse({ type: SecretNote })
  async delete(@Param('id') id: string) {
    const secretNote = await this.secretNoteService.find(+id);
    await this.secretNoteService.remove(secretNote);
    return secretNote;
  }
}
