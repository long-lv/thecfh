import { Injectable } from '@nestjs/common';
import { CreateProductVariantsValueDto } from './dto/create-product-variants-value.dto';
import { UpdateProductVariantsValueDto } from './dto/update-product-variants-value.dto';

@Injectable()
export class ProductVariantsValueService {
  create(createProductVariantsValueDto: CreateProductVariantsValueDto) {
    return 'This action adds a new productVariantsValue';
  }

  findAll() {
    return `This action returns all productVariantsValue`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productVariantsValue`;
  }

  update(id: number, updateProductVariantsValueDto: UpdateProductVariantsValueDto) {
    return `This action updates a #${id} productVariantsValue`;
  }

  remove(id: number) {
    return `This action removes a #${id} productVariantsValue`;
  }
}
