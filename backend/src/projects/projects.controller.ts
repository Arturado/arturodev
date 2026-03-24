import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.projectsService.findOne(slug);
  }

  @Post()
  create(@Body() body: any) {
    return this.projectsService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.projectsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}