import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class N8nPostDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsString()
  mainImage?: string;

  @IsOptional()
  @IsString()
  category?: 'blog' | 'newsletter';
}
