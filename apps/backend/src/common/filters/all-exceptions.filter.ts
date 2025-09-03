import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  BadRequestException,
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    let message = "Internal server error";

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();

      if (
        exception instanceof BadRequestException &&
        Array.isArray(exceptionResponse)
      ) {
        message = exceptionResponse.join("\n");
      } else if (typeof exceptionResponse === "string") {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === "object" &&
        exceptionResponse !== null
      ) {
        message = (exceptionResponse as any).message || "Bad request";
      }
    }

    const errorResponse = {
      statusCode: status,
      message,
    };

    this.logger.error(
      `${request.method} ${request.url} - ${status} - ${JSON.stringify(errorResponse)}`,
      exception instanceof Error ? exception.stack : "Unknown error"
    );

    response.status(status).json(errorResponse);
  }
}
