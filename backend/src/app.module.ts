import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from './projects/projects.module';
import { PostsModule } from './posts/posts.module';
import { ContactModule } from './contact/contact.module';
import { AuthModule } from './auth/auth.module';
import { ExperienceModule } from './experience/experience.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    NestConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    ProjectsModule,
    PostsModule,
    ContactModule,
    ExperienceModule,
    ConfigModule,
  ],
})
export class AppModule {}