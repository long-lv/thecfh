import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MESSAGE_UTIL } from 'src/util/message-data.utils';
import { Repository } from 'typeorm';
import { AttributeValueService } from '../attribute-value/attribute-value.service';
import { ProductAttributesService } from '../product-attributes/product-attributes.service';
import { CreateProductAttributeValueDto } from './dto/create-product-attribute-value.dto';
import { UpdateProductAttributeValueDto } from './dto/update-product-attribute-value.dto';
import { ProductAttributeValue } from './entities/product-attribute-value.entity';

@Injectable()
export class ProductAttributeValuesService {
	constructor(
		@InjectRepository(ProductAttributeValue)
		private productAttributeValueRepository: Repository<ProductAttributeValue>,
		private productAttributesService: ProductAttributesService,
		private attributeValueService: AttributeValueService,
	) {}
	async create(createProductAttributeValueDto: CreateProductAttributeValueDto) {
		const { attributeValueId, productAttributeId } =
			createProductAttributeValueDto;
		void Promise.all([
			this.productAttributesService.findById(String(productAttributeId)),
			this.attributeValueService.findOneById(String(attributeValueId)),
		]);

		const createdProductAttrValue = this.productAttributeValueRepository.create(
			createProductAttributeValueDto,
		);
		const saved = await this.productAttributeValueRepository.save(
			createdProductAttrValue,
		);
		if (!saved) {
			throw new BadRequestException(
				MESSAGE_UTIL.CREATE_FAIL('product attribute value'),
			);
		}

		return {
			data: saved,
			message: MESSAGE_UTIL.CREATE_SUCCESS('product attribute value'),
			statusCode: HttpStatus.CREATED,
		};
	}

	async findByProductAttrId(productAttrId: string) {
		// const result = await this.productAttributeValueRepository.find({
		// 	where: { productAttributeId: Number(productAttrId) },
		// 	relations: ['attributeValue', 'attributeValue.attribute'],
		// }); relations ship.

		const result = await this.productAttributeValueRepository
			.createQueryBuilder('pav')
			.leftJoinAndSelect('pav.attributeValue', 'av')
			.leftJoinAndSelect('av.attribute', 'attr')
			.where('pav.productAttributeId = :productAttrId', {
				productAttrId: Number(productAttrId),
			})
			.getMany();

		if (!result || result.length === 0) {
			throw new BadRequestException(MESSAGE_UTIL.NOT_FOUND('product attribute'));
		}

		const mappedData = result.map((item) => {
			const {
				attributeValueId,
				createdAt,
				updatedAt,
				deleteAt,
				attributeValue,
				// attribute,
				...itemMapped
			} = item;
			return {
				...itemMapped,
				attributeValue: {
					id: attributeValue.id,
					value: attributeValue.value,
					attributeId: attributeValue.attributeId,
					attributeName: attributeValue.attribute.name,
				},
			};
		});

		return {
			data: mappedData,
			message: MESSAGE_UTIL.GET_SUCCESS(
				'product attribute value by product attribute',
			),
			statusCode: HttpStatus.OK,
		};
	}

	async update(
		id: string,
		updateProductAttributeValueDto: UpdateProductAttributeValueDto,
	) {
		const checkExistProducAttrVal =
			await this.productAttributeValueRepository.findOne({
				where: { id },
			});
		if (!checkExistProducAttrVal) {
			throw new BadRequestException(
				MESSAGE_UTIL.NOT_FOUND('product attribute value'),
			);
		}
		const { attributeValueId, productAttributeId } =
			updateProductAttributeValueDto;
		void Promise.all([
			this.productAttributesService.findById(String(productAttributeId)),
			this.attributeValueService.findOneById(String(attributeValueId)),
		]);

		const updated = await this.productAttributeValueRepository.update(
			id,
			updateProductAttributeValueDto,
		);

		if (!updated) {
			throw new BadRequestException(
				MESSAGE_UTIL.UPDATE_FAIL(id, 'product attribute value'),
			);
		}
		const productAttrValUpdated =
			await this.productAttributeValueRepository.findOne({
				where: { id },
			});

		return {
			data: productAttrValUpdated,
			message: MESSAGE_UTIL.UPDATE_SUCCESS(id, 'product attribute value'),
			statusCode: HttpStatus.OK,
		};
	}

	async remove(id: string) {
		const checkExists = await this.productAttributeValueRepository.findOne({
			where: { id },
		});

		if (!checkExists) {
			throw new BadRequestException(
				MESSAGE_UTIL.DELETE_FAIL(id, 'product attribute value'),
			);
		}

		const deleted = await this.productAttributeValueRepository.softDelete(id);

		if (!deleted) {
			throw new BadRequestException(
				MESSAGE_UTIL.DELETE_FAIL(id, 'product attribute value'),
			);
		}

		return {
			message: MESSAGE_UTIL.DELETE_SUCCESS(id, 'product attribute value'),
			statusCode: HttpStatus.NO_CONTENT,
		};
	}
}
