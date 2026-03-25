import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ConfigService } from './config.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  getAll() {
    return this.configService.getAll();
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  setMany(@Body() body: Record<string, string>) {
    return this.configService.setMany(body);
  }
}