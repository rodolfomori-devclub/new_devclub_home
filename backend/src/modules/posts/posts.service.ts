import { Injectable, NotFoundException, BadRequestException, Inject, forwardRef } from '@nestjs/common';
import { FirebaseService } from '../../config/firebase.config';
import { SanityService } from '../../config/sanity.config';
import { OpenAIService } from '../../config/openai.config';
import { WebhooksService } from '../webhooks/webhooks.service';
import { CreatePostDto, PostStatus, PostCategory, CreationType } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { GenerateFromTopicDto, GenerateFromFaqDto } from './dto/generate-post.dto';

export interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  status: PostStatus;
  category: PostCategory;
  slug?: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  sanityId?: string;
  creationType?: CreationType;
}

@Injectable()
export class PostsService {
  constructor(
    private firebaseService: FirebaseService,
    private sanityService: SanityService,
    private openaiService: OpenAIService,
    @Inject(forwardRef(() => WebhooksService))
    private webhooksService: WebhooksService,
  ) {}

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const now = new Date();
    const postData = {
      ...createPostDto,
      status: PostStatus.DRAFT,
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await this.firebaseService.postsCollection.add(postData);
    const doc = await docRef.get();

    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data?.createdAt || now,
      updatedAt: data?.updatedAt || now,
    } as Post;
  }

  async findAll(
    category?: PostCategory,
    status?: PostStatus,
    search?: string,
  ): Promise<Post[]> {
    let query: any = this.firebaseService.postsCollection;

    // Only add filters without orderBy to avoid composite index requirement
    // We'll sort client-side instead
    if (category) {
      query = query.where('category', '==', category);
    }
    if (status) {
      query = query.where('status', '==', status);
    }

    // Only use orderBy if no where clauses are applied (to avoid composite index requirement)
    const hasFilters = category || status;
    if (!hasFilters) {
      query = query.orderBy('createdAt', 'desc');
    }

    const snapshot = await query.get();
    let posts = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data?.createdAt,
        updatedAt: data?.updatedAt,
        publishedAt: data?.publishedAt,
      };
    }) as Post[];

    // Sort client-side if filters were applied (no server-side ordering)
    if (hasFilters) {
      posts.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA; // descending
      });
    }

    // Filter by search if provided
    if (search) {
      const searchLower = search.toLowerCase();
      posts = posts.filter(
        post =>
          post.title.toLowerCase().includes(searchLower) ||
          post.description.toLowerCase().includes(searchLower),
      );
    }

    return posts;
  }

  async findOne(id: string): Promise<Post> {
    const doc = await this.firebaseService.postsCollection.doc(id).get();

    if (!doc.exists) {
      throw new NotFoundException('Post nao encontrado');
    }

    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data?.createdAt,
      updatedAt: data?.updatedAt,
      publishedAt: data?.publishedAt,
    } as Post;
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const docRef = this.firebaseService.postsCollection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new NotFoundException('Post nao encontrado');
    }

    const updateData = {
      ...updatePostDto,
      updatedAt: new Date(),
    };

    await docRef.update(updateData);

    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    const docRef = this.firebaseService.postsCollection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new NotFoundException('Post nao encontrado');
    }

    // If published, also delete from Sanity
    const data = doc.data();
    if (data?.sanityId) {
      try {
        await this.sanityService.delete(data.sanityId);
      } catch (error) {
        console.error('Error deleting from Sanity:', error);
      }
    }

    await docRef.delete();
  }

  async bulkDelete(ids: string[]): Promise<{ deleted: number }> {
    let deleted = 0;
    for (const id of ids) {
      try {
        await this.delete(id);
        deleted++;
      } catch (error) {
        console.error(`Error deleting post ${id}:`, error);
      }
    }
    return { deleted };
  }

  async publish(id: string): Promise<Post> {
    const post = await this.findOne(id);

    if (post.status === PostStatus.PUBLISHED) {
      throw new BadRequestException('Post ja esta publicado');
    }

    const slug = this.slugify(post.title);
    const now = new Date();

    // Create in Sanity
    const sanityDoc = await this.sanityService.create({
      _type: 'post',
      title: post.title,
      description: post.description,
      slug: { current: slug },
      category: post.category,
      content: post.content,
      publishedAt: now.toISOString(),
    });

    // Update Firestore
    await this.firebaseService.postsCollection.doc(id).update({
      status: PostStatus.PUBLISHED,
      slug,
      sanityId: sanityDoc._id,
      publishedAt: now,
      updatedAt: now,
    });

    // Send webhook notification for newsletter posts
    await this.webhooksService.sendApprovalWebhook({
      postId: id,
      sanityId: sanityDoc._id,
      title: post.title,
      slug,
      category: post.category,
      description: post.description,
      content: post.content,
    });

    return this.findOne(id);
  }

  async unpublish(id: string): Promise<Post> {
    const post = await this.findOne(id);

    if (post.status !== PostStatus.PUBLISHED) {
      throw new BadRequestException('Post nao esta publicado');
    }

    // Delete from Sanity
    if (post.sanityId) {
      await this.sanityService.delete(post.sanityId);
    }

    // Update Firestore
    await this.firebaseService.postsCollection.doc(id).update({
      status: PostStatus.DRAFT,
      sanityId: null,
      publishedAt: null,
      updatedAt: new Date(),
    });

    return this.findOne(id);
  }

  async generateFromTopic(dto: GenerateFromTopicDto): Promise<Post> {
    try {
      const generated = await this.openaiService.generatePostFromTopic(
        dto.topic,
        dto.category,
      );

      return this.create({
        title: generated.title,
        description: generated.description,
        content: generated.content,
        category: dto.category,
        creationType: CreationType.TEMA,
      });
    } catch (error) {
      throw new BadRequestException('Erro ao gerar conteudo com IA: ' + error.message);
    }
  }

  async generateFromFaq(dto: GenerateFromFaqDto): Promise<Post> {
    try {
      const generated = await this.openaiService.generatePostFromFaq(
        dto.questions,
        dto.category,
      );

      return this.create({
        title: generated.title,
        description: generated.description,
        content: generated.content,
        category: dto.category,
        creationType: CreationType.DUVIDAS,
      });
    } catch (error) {
      throw new BadRequestException('Erro ao gerar conteudo com IA: ' + error.message);
    }
  }
}
