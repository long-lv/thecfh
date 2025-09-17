import { Module } from '@nestjs/common';
import { ProductVariantsValueService } from './product-variants-value.service';
import { ProductVariantsValueController } from './product-variants-value.controller';

@Module({
  controllers: [ProductVariantsValueController],
  providers: [ProductVariantsValueService],
})
export class ProductVariantsValueModule {}
