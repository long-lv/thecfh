import {
	BadRequestException,
	ForbiddenException,
	HttpStatus,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { MESSAGE_UTIL } from 'src/util/message-data.utils';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Auth } from './entities/auth.entity';
import { TCheckEmailAndUserExistsReq } from './type/user.type';
import { sanitizeUser } from 'src/util/constaint';
import { ENV } from 'src/config/env.config';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		@InjectRepository(Auth)
		private userRepository: Repository<Auth>,
	) {}

	async signUp(createUser: CreateAuthDto) {
		const checkUserExists = await this.checkEmailEndUserExists({
			email: createUser.email,
			name: createUser.name,
		});

		if (checkUserExists) {
			throw new BadRequestException(MESSAGE_UTIL.ALREADY_EXISTS('email or name'));
		}
		const hashPw = await bcrypt.hash(createUser.password, 10);
		const userCreated = this.userRepository.create({
			...createUser, // TODO waiting module sendEmail verify
			password: hashPw,
		});
		const rs = await this.userRepository.save(userCreated);
		if (!rs) {
			throw new BadRequestException(MESSAGE_UTIL.CREATE_FAIL('create user'));
		}
		const userSignUp = sanitizeUser(rs);
		return {
			statusCode: HttpStatus.CREATED,
			data: userSignUp,
			message: MESSAGE_UTIL.CREATE_SUCCESS('created user'),
		};
	}

	async signIn(info: SignInDto) {
		const user = await this.findUserByEmail(info.email);
		if (!user) {
			throw new UnauthorizedException(MESSAGE_UTIL.LOGIN_FAIL);
		}
		const pwMatches = await bcrypt.compare(info.password, user.password);
		if (!pwMatches) {
			throw new UnauthorizedException(MESSAGE_UTIL.LOGIN_FAIL);
		}
		const tokens = await this.getTokens(user.id, user.email);
		await this.updateRefetchToken(user.id, tokens.refresh_token);
		const safeUser = sanitizeUser(user);
		return {
			statusCode: HttpStatus.OK,
			message: MESSAGE_UTIL.LOGIN_SUCCESS,
			data: { ...safeUser, tokens: tokens },
		};
	}

	async logOug(id: string) {
		await this.updateRefetchToken(id, null);
	}

	async getTokens(id: string, email: string) {
		const [at, rt] = await Promise.all([
			this.jwtService.signAsync(
				{ sub: id, email },
				{ secret: 'AT_SECRET', expiresIn: '15m' },
			),
			this.jwtService.signAsync(
				{ sub: id, email },
				{ secret: 'RT_SECRET', expiresIn: '7d' },
			),
		]);
		return { access_token: at, refresh_token: rt };
	}

	async updateRefetchToken(userId: string, rt: string | null) {
		const checkUserExists = await this.findUserById(userId);
		if (!checkUserExists) {
			throw new BadRequestException(MESSAGE_UTIL.NOT_FOUND('user'));
		}
		let hashToken = '';
		if (rt) {
			hashToken = await bcrypt.hash(rt, 10);
		}
		const updated = await this.userRepository.update(checkUserExists.id, {
			hashedRefreshToken: hashToken,
		});
		return updated;
	}

	async refreshToken(rt: string) {
		try {
			const payload = await this.jwtService.verifyAsync(rt, {
				secret: 'RT_SECRET',
			});

			return this.getTokens(payload.sub as string, payload.email);
		} catch {
			throw new ForbiddenException('Invalid refresh token');
		}
	}

	async findUserById(id: string) {
		const user = await this.userRepository.findOne({
			where: { id },
		});
		return user;
	}

	async findUserByEmail(email: string) {
		const user = await this.userRepository.findOne({
			where: { email },
		});
		return user;
	}

	async checkEmailEndUserExists({ email, name }: TCheckEmailAndUserExistsReq) {
		const checkExists = await this.userRepository.findOne({
			where: [{ email }, { name }],
		});

		if (!checkExists) {
			return false;
		} else {
			return true;
		}
	}

	getRefreshTokenCookieOptions() {
		const isProduction = ENV.NODE_ENV === 'production';
		return {
			httpOnly: true, // JavaScript không thể đọc cookie
			// Development: secure = false (HTTP OK)
			// Production: secure = true (chỉ HTTPS)
			secure: isProduction,
			// Development: 'lax' - Cho phép cross-origin (localhost:3000 → localhost:5000)
			// Production: 'strict' - Chỉ same-origin (an toàn hơn)
			sameSite: isProduction ? ('strict' as const) : ('lax' as const),
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
			path: '/', // Cookie available toàn bộ routes
		};
	}
}
