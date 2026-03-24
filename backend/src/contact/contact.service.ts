import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  create(data: any) {
    return this.prisma.contact.create({ data });
  }

  markAsRead(id: string) {
    return this.prisma.contact.update({
      where: { id },
      data: { read: true },
    });
  }

  remove(id: string) {
    return this.prisma.contact.delete({
      where: { id },
    });
  }
}