import { Controller, INestApplication, Post, UseGuards } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { JwtOrApiKeyGuard } from './jwt-or-api-key.guard';
import { JwtStrategy } from './jwt.strategy';

@Controller('t')
class TestController {
  @Post()
  @UseGuards(JwtOrApiKeyGuard)
  create() {
    return { ok: true };
  }
}

describe('JwtOrApiKeyGuard', () => {
  let app: INestApplication;
  let jwt: JwtService;
  const SECRET = 'blog-secret-de-prueba';

  beforeAll(async () => {
    process.env.JWT_SECRET = 'jwt-secret-de-prueba';
    process.env.BLOG_API_SECRET = SECRET;
    const mod = await Test.createTestingModule({
      imports: [PassportModule, JwtModule.register({ secret: process.env.JWT_SECRET })],
      controllers: [TestController],
      providers: [JwtStrategy],
    }).compile();
    app = mod.createNestApplication();
    await app.init();
    jwt = mod.get(JwtService);
  });

  afterAll(() => app.close());
  beforeEach(() => {
    process.env.BLOG_API_SECRET = SECRET;
  });

  const token = () => jwt.sign({ sub: 'u1', email: 'a@b.c' });
  const post = () => request(app.getHttpServer()).post('/t');

  it('JWT válido → pasa', () =>
    post().set('Authorization', `Bearer ${token()}`).expect(201));

  it('API key válida → pasa', () => post().set('x-api-key', SECRET).expect(201));

  it('API key válida + Bearer con el secreto (como el script) → pasa', () =>
    post().set('x-api-key', SECRET).set('Authorization', `Bearer ${SECRET}`).expect(201));

  it('API key inválida → 401 aunque haya JWT válido', () =>
    post().set('x-api-key', 'mala').set('Authorization', `Bearer ${token()}`).expect(401));

  it('API key de otra longitud → 401', () =>
    post().set('x-api-key', SECRET + 'x').expect(401));

  it('sin credenciales → 401', () => post().expect(401));

  it('JWT inválido → 401', () => post().set('Authorization', 'Bearer basura').expect(401));

  it('secreto vacío + key vacía → 401', () => {
    process.env.BLOG_API_SECRET = '';
    return post().set('x-api-key', '').expect(401);
  });

  it('secreto sin definir + cualquier key → 401, y JWT sigue funcionando', async () => {
    delete process.env.BLOG_API_SECRET;
    await post().set('x-api-key', 'algo').expect(401);
    await post().set('Authorization', `Bearer ${token()}`).expect(201);
  });
});
