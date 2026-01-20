import { Module, forwardRef } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PublicPostsController } from './public-posts.controller';
import { PostsService } from './posts.service';
import { FirebaseService } from '../../config/firebase.config';
import { SanityService } from '../../config/sanity.config';
import { OpenAIService } from '../../config/openai.config';
import { WebhooksModule } from '../webhooks/webhooks.module';

@Module({
  imports: [forwardRef(() => WebhooksModule)],
  controllers: [PostsController, PublicPostsController],
  providers: [PostsService, FirebaseService, SanityService, OpenAIService],
  exports: [PostsService],
})
export class PostsModule {}
