import { PartialType } from '@nestjs/swagger';
import { CreateProductVariantsValueDto } from './create-product-variants-value.dto';

export class UpdateProductVariantsValueDto extends PartialType(CreateProductVariantsValueDto) {}
