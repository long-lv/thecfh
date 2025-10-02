import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatedResponse } from 'src/common/types/paginationResponse.type';
import { SuccessResponse } from 'src/common/types/successResponse.type';
type ResponseWithMessage<T> = {
	message: string;
	statusCode?: number;
	data: T;
};

@Injectable()
export class TransformResponseInterceptor<T>
	implements NestInterceptor<T, SuccessResponse<T>>
{
	intercept(
		context: ExecutionContext,
		next: CallHandler<T>,
	): Observable<SuccessResponse<T>> {
		const ctx = context.switchToHttp();
		const request = ctx.getRequest<Request>();
		const response = ctx.getResponse<Response>();

		return next.handle().pipe(
			map((responseData: T | PaginatedResponse<T>): SuccessResponse<T> => {
				const baseResponse = {
					success: true,
					statusCode: 200,
					timestamp: new Date().toISOString(),
					path: request.url,
				};

				const isPaginated =
					responseData !== null &&
					typeof responseData === 'object' &&
					'data' in responseData &&
					'meta' in responseData;

				if (isPaginated) {
					const { data, meta } = responseData;
					return { ...baseResponse, data, meta };
				}

				if (
					responseData &&
					typeof responseData === 'object' &&
					'message' in responseData &&
					'data' in responseData
				) {
					const { message, data, statusCode } = responseData as ResponseWithMessage<T>;
					if (statusCode) {
						response.status(statusCode);
						return { ...baseResponse, statusCode, message, data };
					}
					return { ...baseResponse, message, data };
				}

				return { ...baseResponse, data: responseData };
			}),
		);
	}
}
