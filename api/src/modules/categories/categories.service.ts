import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { v4 as uuid } from 'uuid';
@Injectable()
export class CategoriesService {
	private listCategory: Partial<Category>[] = [
		{
			id: '1',
			name: 'furniture',
			description: 'furniture Data',
		},
		{
			id: 'electric',
			name: 'electric',
			description: 'electric Data',
		},
	];

	create(createCategoryDto: CreateCategoryDto) {
		const newCategory: Partial<Category> = {
			id: uuid(),
			name: createCategoryDto.name,
			description: createCategoryDto.description,
		};
		this.listCategory.push(newCategory);
		return {
			message: 'Create category success!',
			data: newCategory,
		};
	}

	findAll() {
		return this.listCategory;
	}

	findOne(id: string) {
		const findId = this.listCategory.find((category) => category.id === id);
		if (!findId) {
			throw new NotFoundException({
				message: `Can't get category by ${id}`,
				error: 'Not found',
			});
		}
		return this.listCategory.find((category) => category.id === id);
	}

	update(id: number, updateCategoryDto: UpdateCategoryDto) {
		return `This action updates a #${id} category`;
	}

	remove(id: number) {
		return `This action removes a #${id} category`;
	}
}
