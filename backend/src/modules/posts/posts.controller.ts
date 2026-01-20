import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, PostCategory, PostStatus } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { GenerateFromTopicDto, GenerateFromFaqDto, BulkActionDto } from './dto/generate-post.dto';
import { AuthGuard } from '../../common/guards/auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // Protected routes (admin only)
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(
    @Query('category') category?: PostCategory,
    @Query('status') status?: PostStatus,
    @Query('search') search?: string,
  ) {
    return this.postsService.findAll(category, status, search);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.postsService.delete(id);
  }

  @UseGuards(AuthGuard)
  @Post('bulk-delete')
  bulkDelete(@Body() bulkActionDto: BulkActionDto) {
    return this.postsService.bulkDelete(bulkActionDto.ids);
  }

  @UseGuards(AuthGuard)
  @Post(':id/publish')
  publish(@Param('id') id: string) {
    return this.postsService.publish(id);
  }

  @UseGuards(AuthGuard)
  @Post(':id/unpublish')
  unpublish(@Param('id') id: string) {
    return this.postsService.unpublish(id);
  }

  @UseGuards(AuthGuard)
  @Post('generate/topic')
  generateFromTopic(@Body() dto: GenerateFromTopicDto) {
    return this.postsService.generateFromTopic(dto);
  }

  @UseGuards(AuthGuard)
  @Post('generate/faq')
  generateFromFaq(@Body() dto: GenerateFromFaqDto) {
    return this.postsService.generateFromFaq(dto);
  }
}
