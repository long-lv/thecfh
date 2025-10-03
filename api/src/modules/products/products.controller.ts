import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	UploadedFiles,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductListQueryDto } from './dto/product-list-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { AuGuard } from '../auth/guards/at.guard';

@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Post('create')
	// @UseInterceptors(FileInterceptor('image')) // key in form-data is "image" | FileInterceptor: upload 1 file
	@UseInterceptors(FilesInterceptor('images')) // key in form-data is "images" | FilesInterceptor: multi upload file
	@ApiConsumes('multipart/form-data')
	@ApiResponse({
		status: 201,
		description: 'Product created successfully',
		schema: {
			type: 'object',
			properties: {
				message: {
					type: 'string',
					example: 'Create product successfully',
				},
				data: {
					type: 'object',
					properties: {
						id: { type: 'number', example: 1 },
						name: { type: 'string', example: 'iPhone 15 Pro' },
						description: {
							type: 'string',
							example: 'Latest iPhone with advanced features',
						},
						price: { type: 'string', example: '25000000' },
						imgUrl: {
							type: 'array',
							example:
								'[https://example.com/image.jpg, https://example.com/image_2.jpg ]',
						},
						categoryId: { type: 'number', example: 1 },
						categoryName: { type: 'string', example: 'Electronics' },
						createdAt: { type: 'string', format: 'date-time' },
						updatedAt: { type: 'string', format: 'date-time' },
					},
				},
			},
		},
	})
	@ApiResponse({
		status: 400,
		description: 'Bad request - validation errors',
	})
	create(
		@Body() createProductDto: CreateProductDto,
		// @UploadedFile() file: Express.Multer.File, // upload 1 file
		@UploadedFiles() files: Express.Multer.File[], // multy upload
	) {
		return this.productsService.create(createProductDto, files);
	}

	@UseGuards(AuGuard)
	@Get('list')
	@ApiQuery({
		name: 'page',
		type: String,
		example: '1',
		required: false,
		description: 'Page number',
	})
	@ApiQuery({
		name: 'size',
		type: String,
		example: '25',
		required: false,
		description: 'Number of items per page',
		default: '25',
	})
	@ApiQuery({
		name: 'keyword',
		type: String,
		example: 'iphone',
		description: 'Search keyword by name or description',
		default: '',
		required: false,
	})
	@ApiQuery({
		name: 'order',
		type: String,
		example: 'createdAt-DESC',
		description: 'Sort order by createdAt DESC',
		default: 'createdAt-DESC',
		required: false,
	})
	@ApiResponse({
		status: 200,
		description: 'Products fetched successfully',
		schema: {
			type: 'object',
			properties: {
				message: {
					type: 'string',
					example: 'Get products successfully',
				},
				meta: {
					type: 'object',
					properties: {
						total: { type: 'number', example: 100 },
						limit: { type: 'number', example: 25 },
						page: { type: 'number', example: 1 },
						totalPage: { type: 'number', example: 4 },
					},
				},
				data: {
					type: 'array',
					items: {
						type: 'object',
						properties: {
							id: { type: 'string', example: '1' },
							name: { type: 'string', example: 'iPhone 15 Pro' },
							description: {
								type: 'string',
								example: 'Latest iPhone with advanced features',
							},
							price: { type: 'string', example: '25000000' },
							imgUrl: {
								type: 'string',
								example: 'https://example.com/image.jpg',
							},
							categoryId: { type: 'string', example: '1' },
							categoryName: { type: 'string', example: 'Electronics' },
						},
					},
				},
			},
		},
	})
	findAll(@Query() query: ProductListQueryDto) {
		return this.productsService.findAll(query);
	}

	@Get(':id')
	@ApiResponse({
		status: 200,
		description: 'Product found successfully',
		schema: {
			type: 'object',
			properties: {
				message: {
					type: 'string',
					example: 'Get product successfully',
				},
				data: {
					type: 'object',
					properties: {
						id: { type: 'number', example: 1 },
						name: { type: 'string', example: 'iPhone 15 Pro' },
						description: {
							type: 'string',
							example: 'Latest iPhone with advanced features',
						},
						price: { type: 'string', example: '25000000' },
						imgUrl: {
							type: 'string',
							example: 'https://example.com/image.jpg',
						},
						categoryId: { type: 'number', example: 1 },
						categoryName: { type: 'string', example: 'Electronics' },
						createdAt: { type: 'string', format: 'date-time' },
						updatedAt: { type: 'string', format: 'date-time' },
					},
				},
			},
		},
	})
	@ApiResponse({
		status: 404,
		description: 'Product not found',
		schema: {
			type: 'object',
			properties: {
				message: {
					type: 'string',
					example: 'Product not found',
				},
			},
		},
	})
	findOne(@Param('id') id: string) {
		return this.productsService.findOne(id);
	}

	@Put('update/:id')
	@UseInterceptors(FilesInterceptor('images'))
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				name: {
					type: 'string',
					example: 'iPhone 15 Pro',
					description: 'Name by product',
				},
				description: {
					type: 'string',
					example: 'Latest iPhone with advanced features',
					description: 'Description by product',
				},
				price: {
					type: 'number',
					example: 25000000,
					description: 'Price by product',
				},
				categoryId: {
					type: 'number',
					example: 1,
					description: 'CategoryId by product',
				},
				image: {
					type: 'string',
					format: 'binary',
					description: 'Product image file (optional)',
				},
			},
		},
	})
	@ApiResponse({
		status: 200,
		description: 'Product updated successfully',
		schema: {
			type: 'object',
			properties: {
				message: {
					type: 'string',
					example: 'Update product successfully',
				},
				data: {
					type: 'object',
					properties: {
						id: { type: 'string', example: '1' },
						name: { type: 'string', example: 'iPhone 15 Pro' },
						description: {
							type: 'string',
							example: 'Latest iPhone with advanced features',
						},
						price: { type: 'string', example: '25000000' },
						imgUrl: {
							type: 'string',
							example: 'https://example.com/image.jpg',
						},
					},
				},
				statusCode: {
					type: 'number',
					example: 200,
				},
			},
		},
	})
	update(
		@Param('id') id: string,
		@Body() updateProductDto: UpdateProductDto,
		@UploadedFiles() files: Express.Multer.File[],
	) {
		return this.productsService.update(id, updateProductDto, files);
	}

	@Delete('delete/:id')
	@ApiQuery({
		type: 'string',
		description: 'Id by product',
		example: '1',
	})
	@ApiResponse({
		status: 204,
		description: 'Product deleted successfully',
		schema: {
			type: 'object',
			properties: {
				message: {
					type: 'string',
					example: 'Delete product successfully',
				},
				statusCode: {
					type: 'number',
					example: 204,
				},
			},
		},
	})
	remove(@Param('id') id: string) {
		return this.productsService.remove(id);
	}
}
