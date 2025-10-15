import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Category } from 'src/modules/categories/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesSeeder implements Seeder {
	constructor(
		@InjectRepository(Category)
		private readonly categoriesRepository: Repository<Category>,
	) {}

	async seed(): Promise<void> {

		const categories: Category[] = [];

		for (let i = 0; i < 50; i++) {
			const category = this.categoriesRepository.create({
				name: faker.location.city(),
				description: faker.lorem.sentence(),
			});

			categories.push(category);
		}

		await this.categoriesRepository.save(categories);
		console.log('✅ Seeded 50 users successfully!');
	}

	async drop(): Promise<void> {
		await this.categoriesRepository.delete({});
		console.log('🗑️ Dropped all users!');
	}
}
