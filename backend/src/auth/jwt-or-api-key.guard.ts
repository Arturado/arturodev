import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { timingSafeEqual } from 'crypto';
import { JwtAuthGuard } from './jwt-auth.guard';

/**
 * Acepta una API key (header x-api-key == BLOG_API_SECRET) o, si no viene
 * API key, un JWT de admin. Si la API key viene y no coincide, responde 401
 * sin caer a JWT.
 */
@Injectable()
export class JwtOrApiKeyGuard extends JwtAuthGuard {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    if (apiKey === undefined) {
      return super.canActivate(context);
    }

    const secret = process.env.BLOG_API_SECRET;
    // Sin secreto configurado la vía API key queda deshabilitada
    if (!secret || typeof apiKey !== 'string' || !apiKey) {
      throw new UnauthorizedException('API Key inválida');
    }

    const provided = Buffer.from(apiKey);
    const expected = Buffer.from(secret);
    if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
      throw new UnauthorizedException('API Key inválida');
    }
    return true;
  }
}
