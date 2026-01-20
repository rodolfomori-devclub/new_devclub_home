import { Controller, Post, Body, Get, Logger } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { N8nPostDto } from './dto/n8n-post.dto';

@Controller()
export class WebhooksController {
  private readonly logger = new Logger(WebhooksController.name);

  constructor(private readonly webhooksService: WebhooksService) {}

  /**
   * Endpoint para receber posts do n8n
   * POST /api/n8n-post
   */
  @Post('n8n-post')
  async receiveN8nPost(@Body() dto: N8nPostDto) {
    this.logger.log(`Recebendo post do n8n: ${dto.title}`);
    return this.webhooksService.createPostFromN8n(dto);
  }

  /**
   * Endpoint para trigger de processamento
   * GET /api/trigger-processing
   */
  @Get('trigger-processing')
  async triggerProcessing() {
    this.logger.log('Trigger de processamento recebido');
    return {
      success: true,
      message: 'Processing triggered',
      timestamp: new Date().toISOString(),
    };
  }
}
