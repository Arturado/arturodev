import { Controller, Get, INestApplication, Logger, Post, Body, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import request from 'supertest';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { CreatePostDto } from '../posts/dto/create-post.dto';

const known = (code: string) =>
  new Prisma.PrismaClientKnownRequestError('boom', { code, clientVersion: 'test' });

@Controller('t')
class TestController {
  @Get('generic') generic() { throw new Error('fallo inesperado'); }
  @Get('p2002') p2002() { throw known('P2002'); }
  @Get('p2025') p2025() { throw known('P2025'); }
  @Get('p2003') p2003() { throw known('P2003'); }
  @Get('p2021') p2021() { throw known('P2021'); }
  @Post('post') create(@Body() body: CreatePostDto) { return body; }
}

describe('AllExceptionsFilter + ValidationPipe', () => {
  let app: INestApplication;
  let errorSpy: jest.SpyInstance;

  beforeAll(async () => {
    const mod = await Test.createTestingModule({ controllers: [TestController] }).compile();
    app = mod.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: false, transform: true }));
    app.useGlobalFilters(new AllExceptionsFilter());
    await app.init();
  });
  afterAll(() => app.close());
  beforeEach(() => { errorSpy = jest.spyOn(Logger.prototype, 'error').mockImplementation(); });
  afterEach(() => errorSpy.mockRestore());

  it('error genérico → 500 y se loguea con método, ruta y stack', async () => {
    await request(app.getHttpServer()).get('/t/generic?token=secreto').expect(500);
    expect(errorSpy).toHaveBeenCalledTimes(1);
    const [msg, stack] = errorSpy.mock.calls[0];
    expect(msg).toContain('GET /t/generic -> 500');
    expect(msg).not.toContain('secreto');
    expect(stack).toContain('fallo inesperado');
  });

  it('P2002 → 409, P2025 → 404, P2003 → 400 sin loguear como error', async () => {
    await request(app.getHttpServer()).get('/t/p2002').expect(409);
    await request(app.getHttpServer()).get('/t/p2025').expect(404);
    await request(app.getHttpServer()).get('/t/p2003').expect(400);
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('otro código Prisma (P2021 tabla inexistente) → 500 logueado', async () => {
    await request(app.getHttpServer()).get('/t/p2021').expect(500);
    expect(errorSpy).toHaveBeenCalledTimes(1);
  });

  it('body inválido → 400 con detalle', async () => {
    const res = await request(app.getHttpServer()).post('/t/post').send({ title: 'x' }).expect(400);
    expect(res.body.message).toEqual(expect.arrayContaining([expect.stringContaining('slug')]));
  });

  it('body válido → 201 y se descartan campos no declarados', async () => {
    const res = await request(app.getHttpServer())
      .post('/t/post')
      .send({ slug: 's', title: 't', excerpt: 'e', content: 'c', readTime: '5 min', categoryId: null, summary: 'x', category: 'Y', id: 'z' })
      .expect(201);
    expect(res.body).toMatchObject({ slug: 's', categoryId: null });
    expect(res.body).not.toHaveProperty('summary');
    expect(res.body).not.toHaveProperty('category');
    expect(res.body).not.toHaveProperty('id');
  });
});
