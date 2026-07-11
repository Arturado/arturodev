import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const SINGLETON_ID = 'singleton';

@Injectable()
export class AboutService {
  constructor(private prisma: PrismaService) {}

  async get() {
    const existing = await this.prisma.about.findUnique({ where: { id: SINGLETON_ID } });
    if (existing) return existing;
    return this.prisma.about.create({
      data: { id: SINGLETON_ID, bio: '', available: true },
    });
  }

  update(data: any) {
    return this.prisma.about.upsert({
      where: { id: SINGLETON_ID },
      update: data,
      create: { id: SINGLETON_ID, bio: '', available: true, ...data },
    });
  }
}
