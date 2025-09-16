import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseHttpException extends HttpException {
	constructor(
		message: string | object,
		statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
		error?: string,
	) {
		super(
			{
				statusCode,
				message,
				error: error ?? HttpStatus[statusCode],
				timestamp: new Date().toISOString(),
			},
			statusCode,
		);
	}
}

export class NotFoundException extends BaseHttpException {
	constructor(message = 'Notfound') {
		super(message, HttpStatus.NOT_FOUND);
	}
}

export class InvalidInputException extends BaseHttpException {
	constructor(message = 'Invalid input') {
		super(message, HttpStatus.BAD_REQUEST);
	}
}

export class ForbiddenActionException extends BaseHttpException {
	constructor(message = 'Forbidden action') {
		super(message, HttpStatus.FORBIDDEN);
	}
}
