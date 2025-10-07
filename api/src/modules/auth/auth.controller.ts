import { Body, Controller, Post } from '@nestjs/common';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { SignInDto } from './dto/sign-in.dto';

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
	signIn(@Body() infoSignIn: SignInDto) {
		return this.authService.signIn(infoSignIn);
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
	async refresh(@Body() dto: { refresh_token: string }) {
		return this.authService.refreshToken(dto.refresh_token);
	}
}
