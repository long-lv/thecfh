import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Put,
} from '@nestjs/common';
import { ProductVariantsService } from './product-variants.service';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('product-variants')
export class ProductVariantsController {
	constructor(private readonly productVariantsService: ProductVariantsService) {}

	@Post('create')
	@ApiResponse({
		description: 'Create product variant',
		status: 201,
		schema: {
			type: 'object',
			properties: {
				data: {
					type: 'object',
					properties: {
						id: { type: 'number', example: 1 },
						productId: { type: 'number', example: 1 },
						sku: {
							type: 'string',
							example: 'TSHIRT-A-S-RED',
						},
						price: {
							type: 'number',
							example: 15000,
						},
						stock: { type: 'number', example: 120 },
					},
				},
			},
		},
	})
	create(@Body() createProductVariantDto: CreateProductVariantDto) {
		return this.productVariantsService.create(createProductVariantDto);
	}

	@Get(':id')
	@ApiParam({
		type: String,
		example: '1',
		name: 'id',
		description: 'id product variant',
	})
	@ApiResponse({
		description: 'get product variant by id',
		status: 200,
		schema: {
			type: 'object',
			properties: {
				data: {
					type: 'object',
					properties: {
						id: { type: 'string', example: '1' },
						productId: { type: 'number', example: 1 },
						sku: {
							type: 'string',
							example: 'TSHIRT-A-S-RED',
						},
						price: {
							type: 'number',
							example: 15000,
						},
						stock: { type: 'number', example: 120 },
					},
				},
			},
		},
	})
	findOne(@Param('id') id: string) {
		return this.productVariantsService.findOne(id);
	}

	@Put('update/:id')
	@ApiParam({
		type: String,
		example: '1',
		description: 'id of product variant',
		name: 'id',
	})
	@ApiResponse({
		description: 'update product variant by id',
		status: 200,
		schema: {
			type: 'object',
			properties: {
				data: {
					type: 'object',
					properties: {
						id: { type: 'string', example: '1' },
						productId: { type: 'number', example: 1 },
						sku: {
							type: 'string',
							example: 'TSHIRT-A-S-RED',
						},
						price: {
							type: 'number',
							example: 15000,
						},
						stock: { type: 'number', example: 120 },
					},
				},
			},
		},
	})
	update(
		@Param('id') id: string,
		@Body() updateProductVariantDto: UpdateProductVariantDto,
	) {
		return this.productVariantsService.update(id, updateProductVariantDto);
	}

	@Delete('delete/:id')
	@ApiResponse({
		description: 'delete product variant',
		status: 204,
	})
	@ApiParam({
		name: 'id',
		type: String,
		example: '1',
		description: 'ID of the product variant',
	})
	remove(@Param('id') id: string) {
		return this.productVariantsService.remove(id);
	}
}
