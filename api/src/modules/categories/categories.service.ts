import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenerateDataUtil } from 'src/util/generate-data.util';
import { MESSAGE_UTIL } from 'src/util/message-data.utils';
@Injectable()
export class CategoriesService {
	constructor(
		@InjectRepository(Category)
		private categoriesRepository: Repository<Category>,
	) {}

	async create(createCategoryDto: CreateCategoryDto) {
		const existCategor = await this.categoriesRepository.findOne({
			where: { name: createCategoryDto.name },
		});
		if (existCategor) {
			throw new BadRequestException(
				`${MESSAGE_UTIL.ALREADY_EXISTS('category name')}`,
			);
		}
		const newCategory = this.categoriesRepository.create(createCategoryDto);
		const savedCategory = await this.categoriesRepository.save(newCategory);
		return {
			message: MESSAGE_UTIL.CREATE_SUCCESS('category'),
			data: savedCategory,
		};
	}

	async findAll({
		page = '1',
		limit,
		keyword,
		order = 'createdAt-DESC',
	}: {
		page: string;
		limit: string;
		keyword?: string;
		order?: string;
	}) {
		const { size, skip, sortKey, sortValue } =
			GenerateDataUtil.paginationFields({
				page,
				size: limit,
				sort: order,
			});

		const query = this.categoriesRepository.createQueryBuilder('categories');
		if (keyword) {
			const escapedSearch = keyword.trim().replace(/[%_]/g, '\\$&');
			query.where('categories.name LIKE :keyword', {
				keyword: `%${escapedSearch}%`,
			});
		}

		query.orderBy(`categories.${sortKey}`, sortValue);

		query.skip(skip).take(size);

		const [data, total] = await query.getManyAndCount();

		return {
			meta: {
				total,
				limit: size,
				page,
			},
			data,
		};
	}

	async findOne(id: string) {
		const result = await this.categoriesRepository.findOne({
			where: { id },
		});
		if (!result) {
			throw new NotFoundException(
				`${MESSAGE_UTIL.NOT_FOUND(`category id = ${id}`)}`,
			);
		}
		return {
			message: MESSAGE_UTIL.GET_SUCCESS(`category`),
			data: result,
		};
	}

	async update(id: string, updateCategoryDto: UpdateCategoryDto) {
		const checkExists = await this.findOne(id);
		if (!checkExists) {
			throw new NotFoundException(
				`${MESSAGE_UTIL.NOT_FOUND(`category id = ${id}`)}`,
			);
		}

		if (updateCategoryDto.name) {
			const checkExistCateName = await this.categoriesRepository.findOne({
				where: { name: updateCategoryDto?.name },
			});
			if (checkExistCateName) {
				throw new BadRequestException(
					`${MESSAGE_UTIL.ALREADY_EXISTS('category name')}`,
				);
			}
		}

		this.categoriesRepository.merge(checkExists?.data, updateCategoryDto);
		const updated = await this.categoriesRepository.save(checkExists?.data);
		if (!updated) {
			throw new BadRequestException(MESSAGE_UTIL.UPDATE_FAIL(id, 'category'));
		}
		return {
			messagae: MESSAGE_UTIL.UPDATE_SUCCESS(id, 'category'),
			data: updated,
		};
	}

	async remove(id: string) {
		const checkExists = await this.findOne(id);
		console.log(checkExists, 'checkExists');
		if (!checkExists) {
			throw new NotFoundException(
				`${MESSAGE_UTIL.NOT_FOUND(`category id = ${id}`)}`,
			);
		}
		const deletedCategory = await this.categoriesRepository.softDelete(id);
		if (!deletedCategory) {
			throw new BadRequestException(`${MESSAGE_UTIL.DELETE_FAIL(id, 'category')}`);
		}
		return {
			message: MESSAGE_UTIL.DELETE_SUCCESS(id, `category`),
			data: checkExists?.data,
		};
	}
}
