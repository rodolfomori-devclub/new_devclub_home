import { Controller, Get, Param, Query, NotFoundException } from '@nestjs/common';
import { SanityService } from '../../config/sanity.config';
import { FirebaseService } from '../../config/firebase.config';
import { PostCategory, PostStatus } from './dto/create-post.dto';

@Controller('public/posts')
export class PublicPostsController {
  constructor(
    private readonly sanityService: SanityService,
    private readonly firebaseService: FirebaseService,
  ) {}

  @Get()
  async findPublished(@Query('category') category?: PostCategory) {
    try {
      // Try Sanity first
      const sanityPosts = await this.sanityService.getPublishedPosts(category);
      if (sanityPosts && sanityPosts.length > 0) {
        return sanityPosts;
      }
    } catch (error) {
      console.log('Sanity fetch failed, falling back to Firestore:', error.message);
    }

    // Fallback to Firestore for published posts (without content for faster loading)
    const snapshot = await this.firebaseService.postsCollection
      .where('status', '==', PostStatus.PUBLISHED)
      .get();

    let posts = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        _id: doc.id,
        id: doc.id,
        title: data.title,
        description: data.description,
        slug: data.slug,
        category: data.category,
        publishedAt: data.publishedAt,
        createdAt: data.createdAt,
      };
    });

    // Filter by category (same logic as institutional)
    if (category === 'blog') {
      // Para blog: exclui newsletters
      posts = posts.filter(p => p.category !== 'newsletter');
    } else if (category === 'newsletter') {
      // Para newsletter: apenas newsletters
      posts = posts.filter(p => p.category === 'newsletter');
    }

    // Sort by publishedAt or createdAt descending
    posts.sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() :
                   a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() :
                   b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });

    return posts;
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    try {
      // Try Sanity first
      const sanityPost = await this.sanityService.getPostBySlug(slug);
      if (sanityPost) {
        return sanityPost;
      }
    } catch (error) {
      console.log('Sanity fetch failed, falling back to Firestore:', error.message);
    }

    // Fallback to Firestore
    const snapshot = await this.firebaseService.postsCollection
      .where('slug', '==', slug)
      .where('status', '==', PostStatus.PUBLISHED)
      .get();

    if (snapshot.empty || snapshot.docs.length === 0) {
      throw new NotFoundException('Post não encontrado');
    }

    const doc = snapshot.docs[0];
    const data = doc.data();
    return {
      _id: doc.id,
      id: doc.id,
      title: data.title,
      description: data.description,
      slug: data.slug,
      category: data.category,
      content: data.content,
      publishedAt: data.publishedAt,
      createdAt: data.createdAt,
    };
  }
}
