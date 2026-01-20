export type PostStatus = 'draft' | 'published' | 'generate' | 'failed';
export type PostCategory = 'blog' | 'newsletter';
export type CreationType = 'manual' | 'tema' | 'duvidas';

export interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  status: PostStatus;
  category: PostCategory;
  slug?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  publishedAt?: Date | string;
  sanityId?: string;
  creationType?: CreationType;
}

export interface CreatePostDto {
  title: string;
  description: string;
  content: string;
  category: PostCategory;
  creationType?: CreationType;
}

export interface UpdatePostDto {
  title?: string;
  description?: string;
  content?: string;
  status?: PostStatus;
}

export interface GenerateFromTopicDto {
  topic: string;
  category: PostCategory;
}

export interface GenerateFromFaqDto {
  questions: string[];
  category: PostCategory;
}
