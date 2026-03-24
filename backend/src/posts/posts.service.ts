import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(slug: string) {
    return this.prisma.post.findUnique({
      where: { slug },
    });
  }

  create(data: any) {
    return this.prisma.post.create({ data });
  }

  update(id: string, data: any) {
    return this.prisma.post.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}