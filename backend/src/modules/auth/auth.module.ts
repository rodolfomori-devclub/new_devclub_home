import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { FirebaseService } from '../../config/firebase.config';

@Module({
  controllers: [AuthController],
  providers: [FirebaseService],
})
export class AuthModule {}
