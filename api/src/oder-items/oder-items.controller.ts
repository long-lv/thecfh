import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OderItemsService } from './oder-items.service';
import { CreateOderItemDto } from './dto/create-oder-item.dto';
import { UpdateOderItemDto } from './dto/update-oder-item.dto';

@Controller('oder-items')
export class OderItemsController {
  constructor(private readonly oderItemsService: OderItemsService) {}

  @Post()
  create(@Body() createOderItemDto: CreateOderItemDto) {
    return this.oderItemsService.create(createOderItemDto);
  }

  @Get()
  findAll() {
    return this.oderItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oderItemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOderItemDto: UpdateOderItemDto) {
    return this.oderItemsService.update(+id, updateOderItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.oderItemsService.remove(+id);
  }
}
