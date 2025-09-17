import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductVariantsValueService } from './product-variants-value.service';
import { CreateProductVariantsValueDto } from './dto/create-product-variants-value.dto';
import { UpdateProductVariantsValueDto } from './dto/update-product-variants-value.dto';

@Controller('product-variants-value')
export class ProductVariantsValueController {
  constructor(private readonly productVariantsValueService: ProductVariantsValueService) {}

  @Post()
  create(@Body() createProductVariantsValueDto: CreateProductVariantsValueDto) {
    return this.productVariantsValueService.create(createProductVariantsValueDto);
  }

  @Get()
  findAll() {
    return this.productVariantsValueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productVariantsValueService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductVariantsValueDto: UpdateProductVariantsValueDto) {
    return this.productVariantsValueService.update(+id, updateProductVariantsValueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productVariantsValueService.remove(+id);
  }
}
