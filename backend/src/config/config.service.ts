import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const DEFAULTS: Record<string, string> = {
  site_name: 'Mi Portfolio',
  site_title: 'Full Stack Developer',
  site_description: '+7 años construyendo productos digitales.',
  site_email: 'hola@example.com',
  site_location: 'Santiago, Chile',
  site_available: 'true',
  social_github: '',
  social_linkedin: '',
  social_twitter: '',
  primary_color: '#7c3aed',
  show_blog: 'true',
  show_experience: 'true',
  show_portfolio: 'true',
};

@Injectable()
export class ConfigService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Record<string, string>> {
    const items = await this.prisma.config.findMany();
    const result = { ...DEFAULTS };
    items.forEach(item => { result[item.key] = item.value; });
    return result;
  }

  async get(key: string): Promise<string> {
    const item = await this.prisma.config.findUnique({ where: { key } });
    return item?.value ?? DEFAULTS[key] ?? '';
  }

  async set(key: string, value: string) {
    return this.prisma.config.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }

  async setMany(data: Record<string, string>) {
    const updates = Object.entries(data).map(([key, value]) =>
      this.prisma.config.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      })
    );
    return Promise.all(updates);
  }
}