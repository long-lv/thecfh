import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Put,
} from '@nestjs/common';
import { ProductAttributesService } from './product-attributes.service';
import { CreateProductAttributeDto } from './dto/create-product-attribute.dto';
import { UpdateProductAttributeDto } from './dto/update-product-attribute.dto';

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
		return this.productAttributesService.findOne(productId);
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
