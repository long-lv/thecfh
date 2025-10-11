import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { AttributeValueService } from './attribute-value.service';
import { CreateAttributeValueDto } from './dto/create-attribute-value.dto';
import { UpdateAttributeValueDto } from './dto/update-attriubte-value.dto';

@Controller('attribute-value')
export class AttributeValueController {
	constructor(private readonly attributeValueService: AttributeValueService) {}

	@Post('create')
	create(@Body() createAttributeValueDto: CreateAttributeValueDto) {
		return this.attributeValueService.create(createAttributeValueDto);
	}

	@Get('find-by-attribute/:attributeId')
	findByAttributeId(@Param('attributeId') attributeId: string) {
		return this.attributeValueService.findByAttributeId(attributeId);
	}

	@Get(':id')
	findOneById(@Param('id') id: string) {
		return this.attributeValueService.findOneById(id);
	}

	@Delete('delete/:id')
	delete(@Param('id') id: string) {
		return this.attributeValueService.delete(id);
	}

	@Put('update/:id')
	update(
		@Param('id') id: string,
		@Body() updateAttributeValueDto: UpdateAttributeValueDto,
	) {
		return this.attributeValueService.update(id, updateAttributeValueDto);
	}
}
