import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExperienceService {
  constructor(private prisma: PrismaService) {}

  findAll(type?: string) {
    return this.prisma.experience.findMany({
      where: {
        published: true,
        ...(type ? { type } : {}),
      },
      orderBy: { order: 'asc' },
    });
  }

  findOne(id: string) {
    return this.prisma.experience.findUnique({ where: { id } });
  }

  create(data: any) {
    return this.prisma.experience.create({ data });
  }

  update(id: string, data: any) {
    return this.prisma.experience.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.experience.delete({ where: { id } });
  }

  async reorder(ids: string[]) {
    const updates = ids.map((id, index) =>
      this.prisma.experience.update({
        where: { id },
        data: { order: index },
      })
    );
    return Promise.all(updates);
  }
}