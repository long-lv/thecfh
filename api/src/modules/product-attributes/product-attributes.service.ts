import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductsService } from './../products/products.service';
import { CreateProductAttributeDto } from './dto/create-product-attribute.dto';
// import { UpdateProductAttributeDto } from './dto/update-product-attribute.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MESSAGE_UTIL } from 'src/util/message-data.utils';
import { Repository } from 'typeorm';
import { AttributesService } from '../attributes/attributes.service';
import { UpdateProductAttributeDto } from './dto/update-product-attribute.dto';
import { ProductAttribute } from './entities/product-attribute.entity';

@Injectable()
export class ProductAttributesService {
	constructor(
		@InjectRepository(ProductAttribute)
		private readonly productAttributeRepository: Repository<ProductAttribute>,
		private readonly productService: ProductsService,
		private readonly attributeService: AttributesService,
	) {}
	async create(createProductAttributeDto: CreateProductAttributeDto) {
		const { productId, attributeId } = createProductAttributeDto;
		await Promise.all([
			this.productService.findOne(productId.toString()),
			this.attributeService.findById(attributeId.toString()),
		]);

		const createProductAttrbute = this.productAttributeRepository.create(
			createProductAttributeDto,
		);
		const savedProductAttr = await this.productAttributeRepository.save(
			createProductAttrbute,
		);

		if (!savedProductAttr) {
			throw new BadRequestException(MESSAGE_UTIL.CREATE_FAIL('product attribute'));
		}
		return {
			message: MESSAGE_UTIL.CREATE_SUCCESS('product_atribute'),
			data: savedProductAttr,
			statusCode: HttpStatus.CREATED,
		};
	}

	findAll() {
		return `This action returns all productAttributes`;
	}

	async findById(id: string) {
		const exist = await this.productAttributeRepository.findOne({
			where: { id },
		});

		if (!exist) {
			throw new BadRequestException(MESSAGE_UTIL.NOT_FOUND('product attribute'));
		}

		return {
			data: exist,
			message: MESSAGE_UTIL.GET_SUCCESS('product attribute'),
			statusCode: HttpStatus.OK,
		};
	}

	async findByProductId(productId: string) {
		const productAttributes = await this.productAttributeRepository.find({
			where: { productId: Number(productId) },
			relations: ['attribute'],
		});

		if (!productAttributes || productAttributes.length === 0) {
			throw new BadRequestException(MESSAGE_UTIL.NOT_FOUND('product attribute'));
		}

		return {
			message: MESSAGE_UTIL.GET_SUCCESS('product attribute'),
			data: productAttributes,
		};
	}

	async findByAttributeId(attributeId: string) {
		const productAttribute = await this.productAttributeRepository.findOne({
			where: { id: attributeId },
		});

		if (!productAttribute) {
			throw new BadRequestException(MESSAGE_UTIL.NOT_FOUND('product attribute'));
		}

		return {
			data: productAttribute,
			message: MESSAGE_UTIL.GET_SUCCESS('product attribute'),
			statusCode: HttpStatus.OK,
		};
	}

	async update(
		id: string,
		updateProductAttributeDto: UpdateProductAttributeDto,
	) {
		await this.findByAttributeId(id);

		const updatedProductAttribute = await this.productAttributeRepository.update(
			id,
			updateProductAttributeDto,
		);

		if (!updatedProductAttribute) {
			throw new BadRequestException(
				MESSAGE_UTIL.UPDATE_FAIL(id, 'product attribute'),
			);
		}

		const productAttribute = await this.findByAttributeId(id);

		return {
			data: productAttribute,
			message: MESSAGE_UTIL.UPDATE_SUCCESS(id, 'product attribute'),
			statusCode: HttpStatus.OK,
		};
	}

	async remove(id: string) {
		await this.findByAttributeId(id);

		const deletedProductAttribute =
			await this.productAttributeRepository.softDelete(id);

		if (!deletedProductAttribute) {
			throw new BadRequestException(
				MESSAGE_UTIL.DELETE_FAIL(id, 'product attribute'),
			);
		}

		return {
			message: MESSAGE_UTIL.DELETE_SUCCESS(id, 'product attribute'),
			statusCode: HttpStatus.NO_CONTENT,
		};
	}
}
