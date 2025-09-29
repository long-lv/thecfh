import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiResponse,
} from '@nestjs/swagger';
import { CategoryDto } from './dto/list-category.dto';

@Controller('categories')
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}

	@Post()
	create(@Body() createCategoryDto: CreateCategoryDto) {
		return this.categoriesService.create(createCategoryDto);
	}

	@Get()
	@ApiOperation({ summary: 'Lấy danh sách categories' })
	@ApiOkResponse({
		description: 'Danh sách categories',
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
	findAll() {
		return this.categoriesService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Lấy chi tiết category theo id' })
	@ApiParam({ name: 'id', type: Number, description: 'ID của category' })
	@ApiResponse({
		status: 200,
		description: 'Chi tiết category',
		type: CategoryDto,
	})
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.categoriesService.findOne(id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateCategoryDto: UpdateCategoryDto,
	) {
		return this.categoriesService.update(+id, updateCategoryDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.categoriesService.remove(+id);
	}
}
