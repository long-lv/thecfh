import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class SignInDto {
	@ApiProperty({ name: 'email', description: 'Email user signup' })
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@ApiProperty({ name: 'password', description: 'Password user' })
	@IsNotEmpty()
	@MinLength(6)
	@MaxLength(20)
	password: string;
}
