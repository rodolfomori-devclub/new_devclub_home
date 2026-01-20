import { Module } from '@nestjs/common';
import { CtasController } from './ctas.controller';
import { CtasService } from './ctas.service';
import { FirebaseService } from '../../config/firebase.config';

@Module({
  controllers: [CtasController],
  providers: [CtasService, FirebaseService],
  exports: [CtasService],
})
export class CtasModule {}
