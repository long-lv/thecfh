import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attribute } from './entities/attibute.entity';
import { Like, Repository } from 'typeorm';
import { MESSAGE_UTIL } from 'src/util/message-data.utils';
import { CreateAttrDto } from './dto/create-attr.dto';
import { UpdateAttrDto } from './dto/update-attr.dto';
import { GetListAttrDto } from './dto/get-list-attr.dto';
import { GenerateDataUtil } from 'src/util/generate-data.util';
import { escapedSearch } from 'src/util/constaint';

@Injectable()
export class AttributesService {
	constructor(
		@InjectRepository(Attribute)
		private readonly attributeRepository: Repository<Attribute>,
	) {}

	async findAll(params: GetListAttrDto) {
		const { page, size: limit, keyword, order } = params;

		const { size, skip, sortKey, sortValue } = GenerateDataUtil.paginationFields({
			size: limit,
			sort: order,
			page,
		});
		let keywordSearch = '';
		if (keyword) {
			keywordSearch = escapedSearch(keyword);
		}

		const [result, total] = await this.attributeRepository.findAndCount({
			where: { name: keyword ? Like(`%${keywordSearch}%`) : undefined },
			select: ['id', 'name', 'createdAt', 'updatedAt'],
			skip,
			take: size,
			order: {
				[sortKey]: sortValue,
			},
		});

		return {
			data: result,
			meta: {
				page,
				size,
				totalPage: GenerateDataUtil.generateTotalPage(total, size),
				totalItems: total,
			},
		};
	}

	async create(createAttributeDto: CreateAttrDto) {
		const existAttribute = await this.attributeRepository.findOne({
			where: { name: createAttributeDto.name },
		});

		if (existAttribute) {
			throw new BadRequestException(MESSAGE_UTIL.ALREADY_EXISTS('attribute name'));
		}

		const newAttribute = this.attributeRepository.create(createAttributeDto);
		const savedAtribute = await this.attributeRepository.save(newAttribute);

		if (!savedAtribute) {
			throw new BadRequestException(MESSAGE_UTIL.CREATE_FAIL('attribute'));
		}

		return {
			data: savedAtribute,
			message: MESSAGE_UTIL.CREATE_SUCCESS('attribute'),
			statusCode: HttpStatus.CREATED,
		};
	}

	async findById(id: string) {
		const result = await this.attributeRepository.findOne({
			where: { id },
		});

		if (!result) {
			throw new BadRequestException(MESSAGE_UTIL.NOT_FOUND('attribute'));
		}

		return {
			data: result,
			message: MESSAGE_UTIL.GET_SUCCESS('attribute'),
			statusCode: HttpStatus.OK,
		};
	}

	async update(id: string, updateAttributeDto: UpdateAttrDto) {
		const result = await this.findById(id);

		if (
			updateAttributeDto.name &&
			result?.data?.name !== updateAttributeDto.name
		) {
			const checkNameExists = await this.attributeRepository.findOne({
				where: { name: updateAttributeDto.name },
			});

			if (checkNameExists) {
				throw new BadRequestException(
					MESSAGE_UTIL.ALREADY_EXISTS('attribute name'),
				);
			}
		}

		const updatedAttribute = await this.attributeRepository.update(
			id,
			updateAttributeDto,
		);

		if (!updatedAttribute.affected) {
			throw new BadRequestException(MESSAGE_UTIL.UPDATE_FAIL(id, 'attribute'));
		}

		const attribute = await this.findById(id);

		return {
			data: attribute.data,
			message: MESSAGE_UTIL.UPDATE_SUCCESS(id, 'attribute'),
			statusCode: HttpStatus.OK,
		};
	}

	async delete(id: string) {
		await this.findById(id);
		const deleted = await this.attributeRepository.softDelete(id);
		if (!deleted) {
			throw new BadRequestException(MESSAGE_UTIL.DELETE_FAIL(id, 'attribute'));
		}

		return {
			message: MESSAGE_UTIL.DELETE_SUCCESS(id, 'attribute'),
			statusCode: HttpStatus.NO_CONTENT,
		};
	}
}
