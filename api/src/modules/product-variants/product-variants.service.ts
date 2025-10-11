import {
	BadRequestException,
	forwardRef,
	HttpStatus,
	Inject,
	Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MESSAGE_UTIL } from 'src/util/message-data.utils';
import { Repository } from 'typeorm';
import { AttributeValue } from '../attribute-value/entities/attribute-value.entity';
import { CreateProductVariantsValueDto } from '../product-variants-value/dto/create-product-variants-value.dto';
import { ProductVariantsValueService } from '../product-variants-value/product-variants-value.service';
import { ProductsService } from '../products/products.service';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { ProductVariant } from './entities/product-variant.entity';

@Injectable()
export class ProductVariantsService {
	constructor(
		@InjectRepository(ProductVariant)
		private productVariantRepository: Repository<ProductVariant>,
		private productService: ProductsService,
		@InjectRepository(AttributeValue)
		private attributeValueRepository: Repository<AttributeValue>,
		@Inject(forwardRef(() => ProductVariantsValueService))
		private productVariantValueService: ProductVariantsValueService,
	) {}
	async create(createProductVariantDto: CreateProductVariantDto) {
		const { attributeValueIds, productId } = createProductVariantDto;
		const { data: productData } = await this.productService.findOne(
			String(productId),
		);

		const attrValues =
			await this.attributeValueRepository.findByIds(attributeValueIds);

		if (attrValues.length !== attributeValueIds.length) {
			throw new BadRequestException(MESSAGE_UTIL.NOT_FOUND('attribute value'));
		}

		// create sku
		const productCode = productData.name.replace(/\s+/g, '').toUpperCase();
		const valuesCode = attrValues
			.map((attrVal) => attrVal.value.toUpperCase())
			.join('-');
		const generatedSku = `${productCode}-${valuesCode}`;

		const checkExistSku = await this.productVariantRepository.findOne({
			where: { sku: generatedSku },
		});

		if (checkExistSku) {
			throw new BadRequestException(MESSAGE_UTIL.ALREADY_EXISTS('sku'));
		}

		const newProductVariant = this.productVariantRepository.create({
			...createProductVariantDto,
			sku: generatedSku,
		});
		const savedProductVariant =
			await this.productVariantRepository.save(newProductVariant);
		if (!savedProductVariant) {
			throw new BadRequestException(MESSAGE_UTIL.CREATE_FAIL('product variant'));
		}

		const newProductVariantValue = attributeValueIds.map((attVal) => {
			return {
				productVariantId: Number(savedProductVariant.id),
				attributeValueId: attVal,
			} as CreateProductVariantsValueDto;
		});

		await Promise.all(
			newProductVariantValue.map(async (val) => {
				return this.productVariantValueService.create(val);
			})
		);
		return {
			message: MESSAGE_UTIL.CREATE_SUCCESS('product variant'),
			data: savedProductVariant,
			statusCode: HttpStatus.CREATED,
		};
	}

	async findOne(id: string) {
		const rs = await this.productVariantRepository.findOne({
			where: { id },
		});
		if (!rs) {
			throw new BadRequestException(MESSAGE_UTIL.NOT_FOUND('product variant'));
		}
		return {
			data: rs,
			message: MESSAGE_UTIL.GET_SUCCESS('product variant'),
			statusCode: HttpStatus.OK,
		};
	}

	async update(id: string, updateProductVariantDto: UpdateProductVariantDto) {
		await this.findOne(id);

		const updated = await this.productVariantRepository.update(
			id,
			updateProductVariantDto,
		);
		if (!updated) {
			throw new BadRequestException(
				MESSAGE_UTIL.UPDATE_FAIL(id, 'product variant'),
			);
		}
		const newData = await this.findOne(id);
		return {
			data: newData,
			message: MESSAGE_UTIL.UPDATE_SUCCESS(id, 'product variant'),
			statusCode: HttpStatus.OK,
		};
	}

	async remove(id: string) {
		await this.findOne(id);

		const deleted = await this.productVariantRepository.softDelete(id);
		if (!deleted) {
			throw new BadRequestException(
				MESSAGE_UTIL.DELETE_FAIL(id, 'product variant'),
			);
		}

		return {
			statusCode: HttpStatus.NO_CONTENT,
			message: MESSAGE_UTIL.DELETE_SUCCESS(id, 'product variant'),
		};
	}
}
