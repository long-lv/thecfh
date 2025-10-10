import {
	BadRequestException,
	forwardRef,
	HttpStatus,
	Inject,
	Injectable,
} from '@nestjs/common';
import { CreateProductVariantsValueDto } from './dto/create-product-variants-value.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductVariantsValue } from './entities/product-variants-value.entity';
import { Repository } from 'typeorm';
import { ProductVariantsService } from '../product-variants/product-variants.service';
import { AttributeValueService } from '../attribute-value/attribute-value.service';
import { MESSAGE_UTIL } from 'src/util/message-data.utils';

@Injectable()
export class ProductVariantsValueService {
	constructor(
		@InjectRepository(ProductVariantsValue)
		private productVariantValueRepository: Repository<ProductVariantsValue>,
		@Inject(forwardRef(() => ProductVariantsService)) // khi 2 service gọi sang nhau, ví dụ: productVariant gọi productVariantValue <> ProductVariantvalue gọi productVariant thì 
		// can them @Inject(forwardRef) ở service và forwardRef trong imports của cả 2 module.
		private productVariantService: ProductVariantsService,
		private attributeValueService: AttributeValueService,
	) {}
	async create(createProductVariantsValueDto: CreateProductVariantsValueDto) {
		const { productVariantId, attributeValueId } = createProductVariantsValueDto;
		void (await Promise.all([
			this.attributeValueService.findOneById(String(attributeValueId)),
			this.productVariantService.findOne(String(productVariantId)),
		]));

		const newVariantValue = this.productVariantValueRepository.create({
			variantId: productVariantId,
			attributeValueId: attributeValueId,
		});

		const saved = await this.productVariantValueRepository.save(newVariantValue);
		if (!saved) {
			throw new BadRequestException(
				MESSAGE_UTIL.CREATE_FAIL('product variant value'),
			);
		}
		return {
			data: saved,
			message: MESSAGE_UTIL.CREATE_SUCCESS('product variant value'),
			statusCode: HttpStatus.CREATED,
		};
	}

	// findAll() {
	// 	return `This action returns all productVariantsValue`;
	// }

	// findOne(id: number) {
	// 	return `This action returns a #${id} productVariantsValue`;
	// }

	// update(
	// 	id: number,
	// 	updateProductVariantsValueDto: UpdateProductVariantsValueDto,
	// ) {
	// 	return `This action updates a #${id} productVariantsValue`;
	// }

	async remove(id: string) {
		const checkExist = await this.productVariantValueRepository.findOne({
			where: { id },
		});

		if (!checkExist) {
			throw new BadRequestException(
				MESSAGE_UTIL.NOT_FOUND('product variant value'),
			);
		}
		const deleted = await this.productVariantValueRepository.softDelete(id);
		if (!deleted) {
			throw new BadRequestException(
				MESSAGE_UTIL.DELETE_FAIL(id, 'product variant value'),
			);
		}
		return {
			message: MESSAGE_UTIL.DELETE_SUCCESS(id, 'product variant'),
			statusCode: HttpStatus.NO_CONTENT,
		};
	}
}
