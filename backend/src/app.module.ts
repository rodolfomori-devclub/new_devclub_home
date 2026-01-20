import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { PostsModule } from './modules/posts/posts.module';
import { CtasModule } from './modules/ctas/ctas.module';
import { NewsletterModule } from './modules/newsletter/newsletter.module';
import { WebhooksModule } from './modules/webhooks/webhooks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    PostsModule,
    CtasModule,
    NewsletterModule,
    WebhooksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
