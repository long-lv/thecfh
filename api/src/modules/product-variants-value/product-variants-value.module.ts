import { forwardRef, Module } from '@nestjs/common';
import { ProductVariantsValueService } from './product-variants-value.service';
import { ProductVariantsValueController } from './product-variants-value.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductVariantsValue } from './entities/product-variants-value.entity';
import { AttributeValueModule } from '../attribute-value/attribute-value.module';
import { ProductVariantsModule } from '../product-variants/product-variants.module';

@Module({
	controllers: [ProductVariantsValueController],
	providers: [ProductVariantsValueService],
	imports: [
		TypeOrmModule.forFeature([ProductVariantsValue]),
		AttributeValueModule,
		forwardRef(() => ProductVariantsModule),
	],
	exports: [ProductVariantsValueService],
})
export class ProductVariantsValueModule {}
