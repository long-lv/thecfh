import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MESSAGE_UTIL } from 'src/util/message-data.utils';
import { Repository } from 'typeorm';
import { AttributesService } from '../attributes/attributes.service';
import { CreateAttributeValueDto } from './dto/create-attribute-value.dto';
import { UpdateAttributeValueDto } from './dto/update-attriubte-value.dto';
import { AttributeValue } from './entities/attribute-value.entity';

@Injectable()
export class AttributeValueService {
	constructor(
		@InjectRepository(AttributeValue)
		private readonly attributeValueRepository: Repository<AttributeValue>,
		private readonly attributeService: AttributesService,
	) {}

	async create(createAttrValue: CreateAttributeValueDto) {
		const { attributeId } = createAttrValue;
		await this.attributeService.findById(attributeId.toString());

		const newAttrValue = this.attributeValueRepository.create(createAttrValue);
		const savedAttrValue = await this.attributeValueRepository.save(newAttrValue);

		if (!savedAttrValue) {
			throw new BadRequestException(MESSAGE_UTIL.CREATE_FAIL('attribute value'));
		}

		return {
			message: MESSAGE_UTIL.CREATE_SUCCESS('attribute value'),
			data: savedAttrValue,
			statusCode: HttpStatus.CREATED,
		};
	}

	async findByAttributeId(attributeId: string) {
		await this.attributeService.findById(attributeId);
		const attributeValues = await this.attributeValueRepository.find({
			where: { attributeId: Number(attributeId) },
		});

		if (!attributeValues || attributeValues.length === 0) {
			throw new BadRequestException(MESSAGE_UTIL.NOT_FOUND('attribute value'));
		}

		return {
			message: MESSAGE_UTIL.GET_SUCCESS('attribute value'),
			data: attributeValues,
			statusCode: HttpStatus.OK,
		};
	}

	async findOneById(id: string) {
		const attributeValue = await this.attributeValueRepository.findOne({
			where: { id },
		});

		if (!attributeValue) {
			throw new NotFoundException(MESSAGE_UTIL.NOT_FOUND('attribute value'));
		}

		return {
			message: MESSAGE_UTIL.GET_SUCCESS('attribute value'),
			data: attributeValue,
		};
	}

	async delete(id: string) {
		await this.findOneById(id);
		const deletedProductAttribute =
			await this.attributeValueRepository.softDelete(id);
		if (!deletedProductAttribute) {
			throw new BadRequestException(
				MESSAGE_UTIL.DELETE_FAIL(id, 'attribute value'),
			);
		}

		return {
			message: MESSAGE_UTIL.DELETE_SUCCESS(id, 'attribute value'),
		};
	}

	async update(id: string, updateAttributeValueDto: UpdateAttributeValueDto) {
		await this.findOneById(id);

		const updatedAttributeValue = await this.attributeValueRepository.update(
			id,
			updateAttributeValueDto,
		);

		if (!updatedAttributeValue) {
			throw new BadRequestException(
				MESSAGE_UTIL.UPDATE_FAIL(id, 'attribute value'),
			);
		}

		const attributeValue = await this.findOneById(id);

		return {
			message: MESSAGE_UTIL.UPDATE_SUCCESS(id, 'attribute value'),
			data: attributeValue.data,
		};
	}
}
