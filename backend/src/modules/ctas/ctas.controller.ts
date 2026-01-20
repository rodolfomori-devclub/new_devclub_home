import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CtasService } from './ctas.service';
import { CreateCtaDto, UpdateCtaDto } from './dto/create-cta.dto';
import { AuthGuard } from '../../common/guards/auth.guard';

@Controller('ctas')
export class CtasController {
  constructor(private readonly ctasService: CtasService) {}

  // Public route - get active CTA
  @Get('active')
  findActive() {
    return this.ctasService.findActive();
  }

  // Protected routes
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createCtaDto: CreateCtaDto) {
    return this.ctasService.create(createCtaDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.ctasService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ctasService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCtaDto: UpdateCtaDto) {
    return this.ctasService.update(id, updateCtaDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.ctasService.delete(id);
  }
}
