import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { CreateProductAttributeValueDto } from './dto/create-product-attribute-value.dto';
import { ProductAttributeValuesService } from './product-attribute-values.service';
import { UpdateProductAttributeValueDto } from './dto/update-product-attribute-value.dto';

@Controller('product-attribute-values')
export class ProductAttributeValuesController {
	constructor(
		private readonly productAttributeValuesService: ProductAttributeValuesService,
	) {}

	@Post('create')
	create(
		@Body() createProductAttributeValueDto: CreateProductAttributeValueDto,
	) {
		return this.productAttributeValuesService.create(
			createProductAttributeValueDto,
		);
	}

	@Get('find-by-product-attribute/:productAttrId')
	findByProductAttributeId(@Param('productAttrId') productAttrId: string) {
		return this.productAttributeValuesService.findByProductAttrId(productAttrId);
	}

	@Put('update/:id')
	update(
		@Param('id') id: string,
		@Body() updateProductAttributeValueDto: UpdateProductAttributeValueDto,
	) {
		return this.productAttributeValuesService.update(
			id,
			updateProductAttributeValueDto,
		);
	}

	@Delete('delete/:id')
	remove(@Param('id') id: string) {
		return this.productAttributeValuesService.remove(id);
	}
}
