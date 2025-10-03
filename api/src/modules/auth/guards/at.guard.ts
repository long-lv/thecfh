import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuGuard extends AuthGuard('jwt') {
	constructor() {
		super();
	}
}
