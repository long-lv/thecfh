import {
	BadRequestException,
	HttpStatus,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { escapedSearch } from 'src/util/constaint';
import { GenerateDataUtil } from 'src/util/generate-data.util';
import { MESSAGE_UTIL } from 'src/util/message-data.utils';
import { FindOptionsWhere, Like, Not, Repository } from 'typeorm';
import { Auth } from '../auth/entities/auth.entity';
import { Role } from '../auth/type/user.type';
import { GetListAdminDto, GetListUserDto } from './dto/get-list-user.dto';
import { UpdateListUserDto } from './dto/update-list-user.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(Auth)
		private userRepository: Repository<Auth>,
	) {}

	async findAllUser(params: GetListUserDto) {
		const { page, size: limit, keyword, order, status } = params;
		const { size, skip, sortKey, sortValue } = GenerateDataUtil.paginationFields({
			page,
			size: limit,
			sort: order,
		});
		let keywordSearch = '';
		if (keyword) {
			keywordSearch = escapedSearch(keyword);
		}
		const whereConditions: Partial<FindOptionsWhere<Auth>> = {
			role: Role.USER,
			...(status ? { status } : {}),
		};

		const whereClause: FindOptionsWhere<Auth> | FindOptionsWhere<Auth>[] = keyword
			? [
					{ ...whereConditions, name: Like(`%${keywordSearch}%`) },
					{ ...whereConditions, email: Like(`%${keywordSearch}%`) },
				]
			: whereConditions;

		const [users, total] = await this.userRepository.findAndCount({
			select: ['id', 'name', 'email', 'role', 'status', 'createdAt', 'updatedAt'],
			where: whereClause,
			skip,
			take: size,
			order: {
				[sortKey]: sortValue,
			},
		});

		return {
			meta: {
				total,
				size,
				page,
				totalPage: GenerateDataUtil.generateTotalPage(total, size),
			},
			data: users,
			message: MESSAGE_UTIL.GET_SUCCESS('users'),
			statusCode: HttpStatus.OK,
		};
	}

	async findAllAdmin(params: GetListAdminDto) {
		const { page, size: limit, keyword, order, status } = params;
		const { size, skip, sortKey, sortValue } = GenerateDataUtil.paginationFields({
			page,
			size: limit,
			sort: order,
		});

		let keywordSearch = '';
		if (keyword) {
			keywordSearch = escapedSearch(keyword);
		}

		const whereConditions: Partial<FindOptionsWhere<Auth>> = {
			role: Role.ADMIN,
			...(status ? { status } : {}),
		};

		const whereClause: FindOptionsWhere<Auth> | FindOptionsWhere<Auth>[] = keyword
			? [
					{ name: Like(`%${keywordSearch}%`) },
					{ email: Like(`%${keywordSearch}%`) },
				]
			: whereConditions;

		const [admins, total] = await this.userRepository.findAndCount({
			where: whereClause,
			select: ['id', 'name', 'email', 'role', 'status', 'createdAt', 'updatedAt'],
			skip,
			take: size,
			order: {
				[sortKey]: sortValue,
			},
		});

		return {
			message: MESSAGE_UTIL.GET_SUCCESS('admins'),
			statusCode: HttpStatus.OK,
			data: admins,
			meta: {
				total,
				size,
				page,
				totalPage: GenerateDataUtil.generateTotalPage(total, size),
			},
		};
	}

	async findUserById(id: string) {
		const user = await this.userRepository.findOne({
			where: {
				id,
				role: Role.USER,
			},
		});

		if (!user) {
			throw new NotFoundException(MESSAGE_UTIL.NOT_FOUND('user'));
		}

		const { hashedRefreshToken, password, ...userData } = user;
		return {
			data: userData,
			message: MESSAGE_UTIL.GET_SUCCESS('user'),
			statusCode: HttpStatus.OK,
		};
	}

	async findAdminById(id: string) {
		const admin = await this.userRepository.findOne({
			where: {
				id,
				role: Role.ADMIN,
			},
		});

		if (!admin) {
			throw new NotFoundException(MESSAGE_UTIL.NOT_FOUND('admin'));
		}

		const { hashedRefreshToken, password, ...adminData } = admin;
		return {
			data: adminData,
			message: MESSAGE_UTIL.GET_SUCCESS('admin'),
			statusCode: HttpStatus.OK,
		};
	}

	async deleteUser(id: string) {
		await this.findUserById(id);

		const deletedUser = await this.userRepository.softDelete(id);
		if (!deletedUser) {
			throw new BadRequestException(MESSAGE_UTIL.DELETE_FAIL(id, 'user'));
		}

		return {
			statusCode: HttpStatus.NO_CONTENT,
			message: MESSAGE_UTIL.DELETE_SUCCESS(id, 'user'),
		};
	}

	async deleteAdmin(id: string) {
		await this.findAdminById(id);
		const deletedAdmin = await this.userRepository.softDelete(id);

		if (!deletedAdmin) {
			throw new BadRequestException(MESSAGE_UTIL.DELETE_FAIL);
		}

		return {
			message: MESSAGE_UTIL.DELETE_SUCCESS(id, 'admin'),
			statusCode: HttpStatus.NO_CONTENT,
		};
	}

	async updateUser(id: string, data: UpdateListUserDto) {
		const userExist = await this.userRepository.findOne({
			where: {
				id,
				role: Role.USER,
			},
		});

		if (!userExist) {
			throw new NotFoundException(MESSAGE_UTIL.NOT_FOUND('user'));
		}

		if (data.name && userExist.name !== data.name) {
			const checkUserNameExists = await this.userRepository.findOne({
				where: { name: data.name, id: Not(id) },
				withDeleted: true,
			});

			if (checkUserNameExists) {
				throw new BadRequestException(MESSAGE_UTIL.ALREADY_EXISTS('name'));
			}

			userExist.name = data.name;
		}

		if (data.role) {
			userExist.role = data.role;
		}

		if (data.status) {
			userExist.status = data.status;
		}

		const updatedUser = await this.userRepository.save(userExist);
		if (!updatedUser) {
			throw new BadRequestException(MESSAGE_UTIL.UPDATE_FAIL(id, 'user'));
		}

		const { hashedRefreshToken, password, ...userData } = updatedUser;

		return {
			message: MESSAGE_UTIL.UPDATE_SUCCESS(id, 'user'),
			data: userData,
			statusCode: HttpStatus.OK,
		};
	}

	async updateAdmin(id: string, data: UpdateListUserDto) {
		const adminExist = await this.userRepository.findOne({
			where: {
				id,
				role: Role.ADMIN,
			},
		});

		if (!adminExist) {
			throw new NotFoundException(MESSAGE_UTIL.NOT_FOUND('admin'));
		}

		if (data.name && adminExist.name !== data.name) {
			const checkAdminNameExists = await this.userRepository.findOne({
				where: { name: data.name, id: Not(id) },
				withDeleted: true,
			});

			if (checkAdminNameExists) {
				throw new BadRequestException(MESSAGE_UTIL.ALREADY_EXISTS('name'));
			}

			adminExist.name = data.name;
		}

		if (data.role) {
			adminExist.role = data.role;
		}

		if (data.status) {
			adminExist.status = data.status;
		}

		const updatedAdmin = await this.userRepository.save(adminExist);
		if (!updatedAdmin) {
			throw new BadRequestException(MESSAGE_UTIL.UPDATE_FAIL(id, 'admin'));
		}

		const { hashedRefreshToken, password, ...adminData } = updatedAdmin;

		return {
			message: MESSAGE_UTIL.UPDATE_SUCCESS(id, 'admin'),
			data: adminData,
			statusCode: HttpStatus.OK,
		};
	}
}
