import { Module } from '@nestjs/common';
import { WebhooksController } from './webhooks.controller';
import { WebhooksService } from './webhooks.service';
import { FirebaseService } from '../../config/firebase.config';

@Module({
  controllers: [WebhooksController],
  providers: [WebhooksService, FirebaseService],
  exports: [WebhooksService],
})
export class WebhooksModule {}
