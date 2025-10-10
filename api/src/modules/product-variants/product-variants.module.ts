import { forwardRef, Module } from '@nestjs/common';
import { ProductVariantsService } from './product-variants.service';
import { ProductVariantsController } from './product-variants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductVariant } from './entities/product-variant.entity';
import { ProductsModule } from '../products/products.module';
import { ProductVariantsValueModule } from '../product-variants-value/product-variants-value.module';
import { ProductVariantsValue } from '../product-variants-value/entities/product-variants-value.entity';
import { AttributeValueModule } from '../attribute-value/attribute-value.module';
import { AttributeValue } from '../attribute-value/entities/attribute-value.entity';

@Module({
	controllers: [ProductVariantsController],
	imports: [
		TypeOrmModule.forFeature([
			ProductVariant,
			ProductVariantsValue,
			AttributeValue,
		]),
		ProductsModule,
		forwardRef(() => ProductVariantsValueModule),
		AttributeValueModule,
	],
	providers: [ProductVariantsService],
	exports: [ProductVariantsService],
})
export class ProductVariantsModule {}
