import {
	BadRequestException,
	HttpStatus,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PAGINATION } from 'src/util/constaint';
import { GenerateDataUtil } from 'src/util/generate-data.util';
import { MESSAGE_UTIL } from 'src/util/message-data.utils';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { IFindAllParams } from './type/category.type';
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
			statusCode: HttpStatus.CREATED,
		};
	}

	async findAll({
		page = '1',
		limit,
		keyword,
		order = 'createdAt-DESC',
	}: IFindAllParams) {
		const { size, skip, sortKey, sortValue } =
			GenerateDataUtil.paginationFields({
				page,
				size: limit ?? PAGINATION.SIZE.toString(),
				sort: order,
			});

		const query = this.categoriesRepository.createQueryBuilder('categories').select([
			'categories.id',
			'categories.name',
			'categories.createdAt',
			'categories.updatedAt'
		]);
		if (keyword) {
			const escapedSearch = keyword.trim().replace(/[%_]/g, '\\$&');
			query.where('categories.name LIKE :keyword', {
				keyword: `%${escapedSearch}%`,
			});
		}

		query.orderBy(`categories.${sortKey}`, sortValue)
		.skip(skip)
		.take(size);


		const [data, total] = await query.getManyAndCount();

		return {
			meta: {
				total,
				limit: size,
				page,
				totalPage: Math.ceil(total / size),
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
			statusCode: HttpStatus.OK,
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
			statusCode: HttpStatus.NO_CONTENT,
		};
	}
}
