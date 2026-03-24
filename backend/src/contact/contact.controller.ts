import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  findAll() {
    return this.contactService.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.contactService.create(body);
  }

  @Put(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.contactService.markAsRead(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(id);
  }
}