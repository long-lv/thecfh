import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Seeder } from 'nestjs-seeder';
import { Auth } from 'src/modules/auth/entities/auth.entity';
import { Role, StatusUser } from 'src/modules/auth/type/user.type';
import { Repository } from 'typeorm';

@Injectable()
export class UserSeeder implements Seeder {
	constructor(
		@InjectRepository(Auth)
		private readonly userRepository: Repository<Auth>,
	) {}

	async seed(): Promise<void> {
		const passwordHash = await bcrypt.hash('12345', 10);

		const users: Auth[] = [];

		for (let i = 0; i < 50; i++) {
			const user = this.userRepository.create({
				name: faker.person.fullName(),
				email: faker.internet.email(),
				password: passwordHash,
				role: Role.USER,
				status: StatusUser.ACTIVE,
			});

			users.push(user);
		}

		await this.userRepository.save(users);
		console.log('✅ Seeded 50 users successfully!');
	}

	async drop(): Promise<void> {
		await this.userRepository.delete({});
		console.log('🗑️ Dropped all users!');
	}
}
