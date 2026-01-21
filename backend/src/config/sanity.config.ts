import { createClient, SanityClient } from '@sanity/client';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SanityService implements OnModuleInit {
  private client: SanityClient;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const isProduction = this.configService.get<string>('NODE_ENV') === 'production';

    this.client = createClient({
      projectId: this.configService.get<string>('SANITY_PROJECT_ID'),
      dataset: this.configService.get<string>('SANITY_DATASET') || 'production',
      token: this.configService.get<string>('SANITY_API_TOKEN'),
      apiVersion: '2024-01-01',
      useCdn: isProduction, // Use CDN in production for faster reads
    });
  }

  get sanityClient(): SanityClient {
    return this.client;
  }

  // Create document
  async create(doc: any) {
    return this.client.create(doc);
  }

  // Update document
  async patch(id: string, operations: any) {
    return this.client.patch(id).set(operations).commit();
  }

  // Delete document
  async delete(id: string) {
    return this.client.delete(id);
  }

  // Query documents
  async query(groqQuery: string, params?: any) {
    return this.client.fetch(groqQuery, params);
  }

  // Get published posts (without content for faster loading)
  async getPublishedPosts(category?: string) {
    let query: string;

    if (category === 'blog') {
      // Para blog: pega posts que não são newsletter (igual ao institucional)
      query = `*[_type == "post" && defined(slug.current) && (category == "blog" || !defined(category) || category != "newsletter")] | order(publishedAt desc) {
        _id,
        title,
        description,
        "slug": slug.current,
        category,
        publishedAt
      }`;
    } else if (category === 'newsletter') {
      // Para newsletter: pega apenas posts com category = "newsletter"
      query = `*[_type == "post" && defined(slug.current) && category == "newsletter"] | order(publishedAt desc) {
        _id,
        title,
        description,
        "slug": slug.current,
        category,
        publishedAt
      }`;
    } else {
      // Sem filtro: pega todos os posts publicados
      query = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
        _id,
        title,
        description,
        "slug": slug.current,
        category,
        publishedAt
      }`;
    }

    return this.query(query, { category });
  }

  // Get post by slug
  async getPostBySlug(slug: string) {
    const query = `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      description,
      "slug": slug.current,
      category,
      publishedAt,
      "content": coalesce(content, body)
    }`;
    return this.query(query, { slug });
  }
}
