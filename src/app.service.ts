import { Injectable } from '@nestjs/common';
import { PORT } from '@shared/constants/global.constants';

@Injectable()
export class AppService {

  static port(): number {
    return PORT;
  }
}
