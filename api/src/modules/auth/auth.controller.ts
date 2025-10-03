import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	@Post('signup')
	signUp(@Body() createUser: CreateAuthDto) {
		return this.authService.signUp(createUser);
	}

	@Post('signin')
	signIn(@Body() infoSignIn: SignInDto) {
		return this.authService.signIn(infoSignIn);
	}

	@Post('refresh')
	async refresh(@Body() dto: { refresh_token: string }) {
		return this.authService.refreshToken(dto.refresh_token);
	}
}
