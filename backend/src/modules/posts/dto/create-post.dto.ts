import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export enum PostCategory {
  BLOG = 'blog',
  NEWSLETTER = 'newsletter',
}

export enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  GENERATE = 'generate',
  FAILED = 'failed',
}

export enum CreationType {
  MANUAL = 'manual',
  TEMA = 'tema',
  DUVIDAS = 'duvidas',
}

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsEnum(PostCategory)
  category: PostCategory;

  @IsOptional()
  @IsEnum(CreationType)
  creationType?: CreationType;
}
