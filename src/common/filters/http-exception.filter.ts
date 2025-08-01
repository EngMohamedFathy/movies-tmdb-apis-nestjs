import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors = "INTERNAL_SERVER_ERROR";

    console.log(exception);

    if (exception instanceof HttpException) {
      const res: any = exception.getResponse();
      status = exception.getStatus();
      message = res.message || res || 'Error';
      errors = res.errors || HttpStatus[status];
    }

    response.status(status).json({
      message,
      errors,
      status,
    });
  }
}
