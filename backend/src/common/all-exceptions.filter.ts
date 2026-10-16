import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

/**
 * Filtro global: mapea errores conocidos de Prisma a 4xx y loguea todo 5xx
 * con método, ruta y stack. No loguea bodies (pueden traer datos sensibles).
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('HttpExceptions');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();

    const { status, body } = this.toResponse(exception);

    if (status >= 500) {
      const route = String(req.originalUrl ?? req.url ?? '').split('?')[0];
      const err = exception as Error;
      this.logger.error(
        `${req.method} ${route} -> ${status}: ${err?.message ?? String(exception)}`,
        err?.stack,
      );
    }

    res.status(status).json(body);
  }

  private toResponse(exception: unknown): { status: number; body: unknown } {
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      return {
        status: exception.getStatus(),
        body: typeof response === 'string' ? { statusCode: exception.getStatus(), message: response } : response,
      };
    }

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002':
          return this.error(HttpStatus.CONFLICT, 'Ya existe un registro con ese valor único (por ejemplo, slug)');
        case 'P2025':
          return this.error(HttpStatus.NOT_FOUND, 'Registro no encontrado');
        case 'P2003':
          return this.error(HttpStatus.BAD_REQUEST, 'Referencia inválida a un registro relacionado');
      }
    }

    if (exception instanceof Prisma.PrismaClientValidationError) {
      return this.error(HttpStatus.BAD_REQUEST, 'Datos inválidos');
    }

    return this.error(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
  }

  private error(status: number, message: string) {
    return { status, body: { statusCode: status, message } };
  }
}
