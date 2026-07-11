import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { AboutService } from './about.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get()
  get() {
    return this.aboutService.get();
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  update(@Body() body: any) {
    return this.aboutService.update(body);
  }
}
