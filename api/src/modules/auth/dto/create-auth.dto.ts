import { ApiProperty } from '@nestjs/swagger';
import {
	IsEmail,
	IsEnum,
	IsNotEmpty,
	MaxLength,
	MinLength,
} from 'class-validator';
import { Role, StatusUser } from '../type/user.type';

export class CreateAuthDto {
	@ApiProperty({ name: 'email', description: 'Email user signup' })
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@ApiProperty({ name: 'name', description: 'Name user sigup' })
	@IsNotEmpty()
	@MinLength(3)
	@MaxLength(100)
	name: string;

	@ApiProperty({ name: 'password', description: 'Password user' })
	@IsNotEmpty()
	@MinLength(6)
	@MaxLength(20)
	password: string;

	@ApiProperty({ name: 'role', description: 'Role user', enum: Role })
	@IsNotEmpty()
	@IsEnum(Role, { message: 'role must be one of: ADMIN, CELLER, USER' })
	role: Role;

	@ApiProperty({ name: 'status', description: 'Status user', enum: StatusUser })
	@IsNotEmpty()
	@IsEnum(StatusUser, { message: 'status must be one of: VERIFY, ACTIVE' })
	status: StatusUser;
}
