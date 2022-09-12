import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { DATABASE } from '@shared/constants/global.constants';
import { AppService } from './app.service';

import { SharedModule } from '@shared/shared.module';
import { SecretNoteModule } from "@modules/secret-note/secret-note.module";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: DATABASE,
      autoLoadModels: true,
      synchronize: true,
      logging: true,
    }),
    SharedModule,
    SecretNoteModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
