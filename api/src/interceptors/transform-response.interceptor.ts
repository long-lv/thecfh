import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'express';
import { PaginatedResponse } from 'src/common/types/paginationResponse.type';
import { SuccessResponse } from 'src/common/types/successResponse.type';

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

				return { ...baseResponse, data: responseData };
			}),
		);
	}
}
