import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.project.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
    });
  }

  findOne(slug: string) {
    return this.prisma.project.findUnique({
      where: { slug },
    });
  }

  create(data: CreateProjectDto) {
    return this.prisma.project.create({ data });
  }

  update(id: string, data: UpdateProjectDto) {
    return this.prisma.project.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.project.delete({
      where: { id },
    });
  }

  async reorder(ids: string[]) {
  const updates = ids.map((id, index) =>
    this.prisma.project.update({
      where: { id },
      data: { order: index },
    })
  );
  return Promise.all(updates);
}
}