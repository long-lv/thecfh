import { HttpStatus } from '@nestjs/common';

export class BaseHttpSuccess<T = any> {
	success: boolean;
	statusCode: number;
	timestamp: string;
	path: string;
	data: T;

	constructor(data: T, path: string, statusCode = HttpStatus.OK) {
		this.success = true;
		this.statusCode = statusCode;
		this.timestamp = new Date().toISOString();
		this.path = path;
		this.data = data;
	}
}
