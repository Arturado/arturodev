import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  findAll(categorySlug?: string) {
    return this.prisma.post.findMany({
      where: {
        published: true,
        ...(categorySlug ? { category: { slug: categorySlug } } : {}),
      },
      orderBy: { createdAt: 'desc' },
      include: { category: true },
    });
  }

  findOne(slug: string) {
    return this.prisma.post.findUnique({
      where: { slug },
      include: { category: true },
    });
  }

  create(data: CreatePostDto) {
    const { categoryId, ...rest } = data;
    return this.prisma.post.create({
      data: {
        ...rest,
        ...(categoryId ? { category: { connect: { id: categoryId } } } : {}),
      },
    });
  }

  update(id: string, data: UpdatePostDto) {
    const { categoryId, ...rest } = data;
    return this.prisma.post.update({
      where: { id },
      data: {
        ...rest,
        ...(categoryId ? { category: { connect: { id: categoryId } } } : { category: { disconnect: true } }),
      },
    });
  }

  remove(id: string) {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}