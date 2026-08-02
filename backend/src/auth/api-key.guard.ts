import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    
    // Busca la clave en la cabecera x-api-key o en el token Bearer
    const authHeader = request.headers['authorization'];
    const apiKeyHeader = request.headers['x-api-key'];

    const token = apiKeyHeader || (authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null);
    const expectedSecret = process.env.BLOG_API_SECRET;

    if (!expectedSecret) {
      throw new UnauthorizedException('BLOG_API_SECRET no está configurado en el servidor');
    }

    if (!token || token !== expectedSecret) {
      throw new UnauthorizedException('API Key inválida');
    }

    return true;
  }
}
