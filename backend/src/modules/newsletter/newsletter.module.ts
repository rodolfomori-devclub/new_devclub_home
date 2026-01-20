import { Module } from '@nestjs/common';
import { NewsletterController } from './newsletter.controller';
import { NewsletterService } from './newsletter.service';
import { FirebaseService } from '../../config/firebase.config';

@Module({
  controllers: [NewsletterController],
  providers: [NewsletterService, FirebaseService],
  exports: [NewsletterService],
})
export class NewsletterModule {}
