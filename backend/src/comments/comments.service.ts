import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    });
    const data = await res.json();
    return data.success && data.score >= 0.5;
  } catch {
    return false;
  }
}

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  findByPost(postId: string) {
    return this.prisma.comment.findMany({
      where: { postId, approved: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  findAll() {
    return this.prisma.comment.findMany({
      orderBy: { createdAt: 'desc' },
      include: { post: { select: { title: true, slug: true } } },
    });
  }

  async create(data: { postId: string; name: string; email: string; content: string; recaptchaToken?: string }) {
    const { recaptchaToken, ...rest } = data;
    if (!recaptchaToken) {
      throw new BadRequestException('reCAPTCHA requerido');
    }
    const isHuman = await verifyRecaptcha(recaptchaToken);
    if (!isHuman) {
      throw new BadRequestException('reCAPTCHA inválido');
    }
    return this.prisma.comment.create({
      data: { ...rest, approved: false },
    });
  }

  approve(id: string) {
    return this.prisma.comment.update({
      where: { id },
      data: { approved: true },
    });
  }

  remove(id: string) {
    return this.prisma.comment.delete({
      where: { id },
    });
  }
}
