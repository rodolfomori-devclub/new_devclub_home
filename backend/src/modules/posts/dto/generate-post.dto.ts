import { IsString, IsNotEmpty, IsEnum, IsArray, ArrayMinSize } from 'class-validator';
import { PostCategory } from './create-post.dto';

export class GenerateFromTopicDto {
  @IsString()
  @IsNotEmpty()
  topic: string;

  @IsEnum(PostCategory)
  category: PostCategory;
}

export class GenerateFromFaqDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  questions: string[];

  @IsEnum(PostCategory)
  category: PostCategory;
}

export class BulkActionDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  ids: string[];
}
