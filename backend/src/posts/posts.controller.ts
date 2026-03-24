import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.postsService.findOne(slug);
  }

  @Post()
  create(@Body() body: any) {
    return this.postsService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.postsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}