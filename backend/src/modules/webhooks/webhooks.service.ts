import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirebaseService } from '../../config/firebase.config';
import { N8nPostDto } from './dto/n8n-post.dto';

@Injectable()
export class WebhooksService {
  private readonly logger = new Logger(WebhooksService.name);
  private readonly n8nWebhookUrl: string;

  constructor(
    private firebaseService: FirebaseService,
    private configService: ConfigService,
  ) {
    this.n8nWebhookUrl = this.configService.get<string>('N8N_WEBHOOK_URL') ||
      'https://n8n-webhook.sako8u.easypanel.host/webhook/validation';
  }

  private slugify(text: string): string {
    return text
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

  async createPostFromN8n(dto: N8nPostDto) {
    const now = new Date();
    const slug = dto.slug ? this.slugify(dto.slug) : this.slugify(dto.title);

    const postData = {
      title: dto.title,
      slug,
      description: dto.description || '',
      content: dto.content,
      author: dto.author || 'DevClub IA',
      featured: dto.featured || false,
      mainImage: dto.mainImage || null,
      status: 'draft',
      category: dto.category || 'newsletter',
      createdAt: now,
      updatedAt: now,
      sanityId: null,
    };

    const docRef = await this.firebaseService.postsCollection.add(postData);

    this.logger.log(`Post criado via n8n: ${docRef.id} - ${dto.title}`);

    return {
      success: true,
      message: 'Post created in Firebase and waiting for review',
      postId: docRef.id,
      status: 'draft',
      category: postData.category,
    };
  }

  async sendApprovalWebhook(postData: {
    postId: string;
    sanityId: string;
    title: string;
    slug: string;
    category: string;
    author?: string;
    description?: string;
    content?: string;
  }) {
    // Apenas envia webhook para posts de newsletter
    if (postData.category !== 'newsletter') {
      return;
    }

    try {
      const payload = {
        event: 'post_approved',
        postId: postData.postId,
        sanityId: postData.sanityId,
        title: postData.title,
        slug: postData.slug,
        category: postData.category,
        publishedAt: new Date().toISOString(),
        author: postData.author,
        description: postData.description,
        content: postData.content,
      };

      const response = await fetch(this.n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        this.logger.warn(`Webhook retornou status ${response.status}`);
      } else {
        this.logger.log(`Webhook de aprovação enviado para post: ${postData.postId}`);
      }
    } catch (error) {
      this.logger.error('Erro ao enviar webhook de aprovação:', error);
      // Não lança erro para não impedir a publicação
    }
  }
}
