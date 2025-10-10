import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { CreateProductAttributeDto } from './dto/create-product-attribute.dto';
import { UpdateProductAttributeDto } from './dto/update-product-attribute.dto';
import { ProductAttributesService } from './product-attributes.service';

@Controller('product-attributes')
export class ProductAttributesController {
	constructor(
		private readonly productAttributesService: ProductAttributesService,
	) {}

	@Post('create')
	create(@Body() createProductAttributeDto: CreateProductAttributeDto) {
		return this.productAttributesService.create(createProductAttributeDto);
	}

	@Get(':productId')
	findOne(@Param('productId') productId: string) {
		return this.productAttributesService.findByProductId(productId);
	}

	@Put('update/:id')
	update(
		@Param('id') id: string,
		@Body() updateProductAttributeDto: UpdateProductAttributeDto,
	) {
		return this.productAttributesService.update(id, updateProductAttributeDto);
	}

	@Delete('delete/:id')
	remove(@Param('id') id: string) {
		return this.productAttributesService.remove(id);
	}
}
