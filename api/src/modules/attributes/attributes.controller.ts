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
import { AttributesService } from './attributes.service';
import { GetListAttrDto } from './dto/get-list-attr.dto';
import { CreateAttrDto } from './dto/create-attr.dto';
import { UpdateAttrDto } from './dto/update-attr.dto';

@Controller('attributes')
export class AttributesController {
	constructor(private readonly attributesService: AttributesService) {}

	@Get('list')
	async findAll(@Query() query: GetListAttrDto) {
		return this.attributesService.findAll(query);
	}

	@Post('create')
	async create(@Body() createAttrDto: CreateAttrDto) {
		return this.attributesService.create(createAttrDto);
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		return this.attributesService.findById(id);
	}

	@Put('update/:id')
	async update(@Param('id') id: string, @Body() updateAttr: UpdateAttrDto) {
		return this.attributesService.update(id, updateAttr);
	}

	@Delete('delete/:id')
	async delete(@Param('id') id: string) {
		return this.attributesService.delete(id);
	}
}
