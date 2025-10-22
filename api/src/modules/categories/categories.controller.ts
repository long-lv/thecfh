import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import {
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiResponse,
} from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CategoryListQueryDto } from './dto/category-list-query.dto';
import { CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}
	@Post('create')
	@ApiOperation({ summary: 'Create a category' })
	@ApiResponse({
		status: 200,
		description: 'Create category success!',
		type: Category,
	})
	create(@Body() createCategoryDto: CreateCategoryDto) {
		return this.categoriesService.create(createCategoryDto);
	}

	@Get('list')
	@ApiOperation({ summary: 'Get list categories' })
	@ApiOkResponse({
		description: 'Get list categories',
		type: CategoryDto,
		isArray: true,
		example: [
			{
				id: 1,
				name: 'Furniture',
				desc: 'Furniture Data',
				createdAt: '2025-09-29T12:34:56.789Z',
			},
			{
				id: 2,

				name: 'Electronics',
				desc: 'Electronics Data',
				createdAt: '2025-09-29T12:35:12.789Z',
			},
		],
	})
	findAll(@Query() query: CategoryListQueryDto) {
		const { keyword, order, page, size, isGetAll } = query;
		return this.categoriesService.findAll({
			keyword,
			order,
			page,
			isGetAll,
			limit: size,
		});
	}

	@Get(':id')
	@ApiOperation({ summary: 'find category by id' })
	@ApiParam({ name: 'id', type: String, description: 'id by category' })
	@ApiResponse({
		status: 200,
		description: 'find category by successfully',
		type: CategoryDto,
	})
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.categoriesService.findOne(id);
	}

	@Put('update/:id')
	@ApiOperation({ summary: 'update category by id' })
	@ApiParam({ name: 'id', type: String, description: 'id by category' })
	@ApiResponse({
		status: 200,
		description: 'updated category sueccessfully',
		type: Category,
	})
	update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
		return this.categoriesService.update(id, updateCategoryDto);
	}

	@ApiOperation({ summary: 'delete category by id' })
	@ApiParam({ name: 'id', type: String, description: 'Id by category' })
	@ApiResponse({
		status: 204,
		description: 'delete category by id succsessfully',
	})
	@Delete('delete/:id')
	remove(@Param('id') id: string) {
		return this.categoriesService.remove(id);
	}
}
