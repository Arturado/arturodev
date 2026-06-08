import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HeroSlidesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.heroSlide.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
  }

  findAllAdmin() {
    return this.prisma.heroSlide.findMany({
      orderBy: { order: 'asc' },
    });
  }

  create(data: any) {
    return this.prisma.heroSlide.create({ data });
  }

  update(id: string, data: any) {
    return this.prisma.heroSlide.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.heroSlide.delete({ where: { id } });
  }

  async reorder(ids: string[]) {
    const updates = ids.map((id, index) =>
      this.prisma.heroSlide.update({ where: { id }, data: { order: index } }),
    );
    return Promise.all(updates);
  }
}
