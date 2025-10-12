import {
	Body,
	Controller,
	Post,
	Req,
	Res,
	UnauthorizedException,
} from '@nestjs/common';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { SignInDto } from './dto/sign-in.dto';
import type { Request, Response } from 'express';
import { MESSAGE_UTIL } from 'src/util/message-data.utils';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	@ApiResponse({
		status: 201,
		description: 'This action created created user successfully!',
		schema: {
			type: 'object',
			properties: {
				data: {
					type: 'object',
					properties: {
						id: { type: 'number', example: 1 },
						email: { type: 'string', example: 'example@gmail.com' },
						name: { type: 'string', example: 'John Doe' },
						role: { type: 'string', example: 'ADMIN' },
						status: { type: 'string', example: 'active' },
						createdAt: { type: 'string', example: '2021-01-01' },
						updatedAt: { type: 'string', example: '2021-01-01' },
					},
				},
			},
		},
	})
	@Post('signup')
	signUp(@Body() createUser: CreateAuthDto) {
		return this.authService.signUp(createUser);
	}
	@ApiResponse({
		status: 200,
		description: 'This action signin user successfully!',
		schema: {
			type: 'object',
			properties: {
				data: {
					type: 'object',
					properties: {
						id: { type: 'number', example: 1, description: 'Id of user' },
						email: {
							type: 'string',
							example: 'example@gmail.com',
							description: 'Email of user',
						},
						name: {
							type: 'string',
							example: 'John Doe',
							description: 'Name of user',
						},
						role: { type: 'string', example: 'ADMIN', description: 'Role of user' },
						status: {
							type: 'string',
							example: 'active',
							description: 'Status of user',
						},
						createdAt: {
							type: 'string',
							example: '2021-01-01',
							description: 'Created at of user',
						},
						updatedAt: {
							type: 'string',
							example: '2021-01-01',
							description: 'Updated at of user',
						},
						tokens: {
							type: 'object',
							properties: {
								access_token: {
									type: 'string',
									example: 'access_token',
									description: 'Access token of user',
								},
								refresh_token: {
									type: 'string',
									example: 'refresh_token',
									description: 'Refresh token of user',
								},
							},
						},
					},
				},
			},
		},
	})
	@Post('signin')
	async signIn(
		@Body() infoSignIn: SignInDto,
		@Res({ passthrough: true }) res: Response,
	) {
		const result = await this.authService.signIn(infoSignIn);
		// Set httpOnly cookie
		res.cookie(
			'refreshToken',
			result.data.tokens.refresh_token,
			this.authService.getRefreshTokenCookieOptions(),
		);

		const { refresh_token, ...tokensWithoutRefresh } = result.data.tokens;

		return {
			statusCode: result.statusCode,
			message: result.message,
			data: {
				...result.data,
				tokens: tokensWithoutRefresh,
			},
		};
	}
	@ApiProperty({
		name: 'refresh_token',
		description: 'Refresh token of user',
		type: String,
	})
	@ApiResponse({
		status: 200,
		description: 'This action refresh token successfully!',
		schema: {
			type: 'object',
			properties: {
				data: {
					type: 'object',
					properties: {
						access_token: {
							type: 'string',
							example: 'access_token',
							description: 'Access token of user',
						},
						refresh_token: {
							type: 'string',
							example: 'refresh_token',
							description: 'Refresh token of user',
						},
					},
				},
			},
		},
	})
	@Post('refresh')
	async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		const refreshToken = req.cookies['refreshToken'] as string;
		if (!refreshToken) {
			throw new UnauthorizedException(MESSAGE_UTIL.UNTHORIZED);
		}
		// get new tokens
		const tokens = await this.authService.refreshToken(refreshToken);

		// set new httpOnly cookie
		res.cookie(
			'refreshToken',
			tokens.refresh_token,
			this.authService.getRefreshTokenCookieOptions(),
		);
		return {
			statusCode: 200,
			data: {
				access_token: tokens.access_token,
			},
		};
	}

	@Post('logout')
	logout(@Res({ passthrough: true }) res: Response) {
		res.clearCookie('refreshToken');

		return {
			statusCode: 200,
			message: 'Logged out successfully',
		};
	}
}
