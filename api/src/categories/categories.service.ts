import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
	private listCategory: Category[] = [
		{
			id: '1',
			name: 'furniture',
			desc: 'furniture Data',
		},
		{
			id: 'electric',
			name: 'electric',
			desc: 'electric Data',
		},
	];

	create(createCategoryDto: CreateCategoryDto) {
		return 'This action adds a new category';
	}

	findAll() {
		return this.listCategory;
	}

	findOne(id: string) {
		return this.listCategory.find((category) => category.id === id);
	}

	update(id: number, updateCategoryDto: UpdateCategoryDto) {
		return `This action updates a #${id} category`;
	}

	remove(id: number) {
		return `This action removes a #${id} category`;
	}
}
