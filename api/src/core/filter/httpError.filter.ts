import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const status = exception.getStatus();
		const exceptionResponse = exception.getResponse() as
			| string
			| { message: string | string[]; error?: string; [key: string]: any };

		const message =
			typeof exceptionResponse === 'string'
				? exceptionResponse
				: exceptionResponse.message;
		const error =
			typeof exceptionResponse === 'string' ? null : exceptionResponse.error;

		response.status(status).json({
			statusCode: status,
			success: false,
			timestamp: new Date().toISOString(),
			path: request.url,
			error,
			message,
		});
	}
}
