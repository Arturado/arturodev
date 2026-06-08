import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { HeroSlidesService } from './hero-slides.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('hero-slides')
export class HeroSlidesController {
  constructor(private readonly heroSlidesService: HeroSlidesService) {}

  @Get()
  findAll() {
    return this.heroSlidesService.findAll();
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard)
  findAllAdmin() {
    return this.heroSlidesService.findAllAdmin();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() body: any) {
    return this.heroSlidesService.create(body);
  }

  @Put('reorder')
  @UseGuards(JwtAuthGuard)
  reorder(@Body() body: { ids: string[] }) {
    return this.heroSlidesService.reorder(body.ids);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() body: any) {
    return this.heroSlidesService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.heroSlidesService.remove(id);
  }
}
