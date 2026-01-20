import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { NewsletterService } from './newsletter.service';
import { SubscribeDto, UnsubscribeDto } from './dto/subscribe.dto';
import { AuthGuard } from '../../common/guards/auth.guard';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  // Public routes
  @Post('subscribe')
  subscribe(@Body() subscribeDto: SubscribeDto) {
    return this.newsletterService.subscribe(subscribeDto);
  }

  @Post('unsubscribe')
  unsubscribe(@Body() unsubscribeDto: UnsubscribeDto) {
    return this.newsletterService.unsubscribe(unsubscribeDto.email);
  }

  // Protected routes (admin only)
  @UseGuards(AuthGuard)
  @Get('subscribers')
  findAll() {
    return this.newsletterService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('subscribers/active')
  findActive() {
    return this.newsletterService.findActive();
  }

  @UseGuards(AuthGuard)
  @Get('stats')
  getStats() {
    return this.newsletterService.getStats();
  }

  @UseGuards(AuthGuard)
  @Get('export')
  async exportCsv(@Res() res: Response) {
    const csv = await this.newsletterService.exportToCsv();

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=subscribers.csv');
    res.send(csv);
  }
}
