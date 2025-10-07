import { Module } from '@nestjs/common';
import { ProductAttributesService } from './product-attributes.service';
import { ProductAttributesController } from './product-attributes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAttribute } from './entities/product-attribute.entity';
import { ProductsModule } from '../products/products.module';
import { AttributesModule } from '../attributes/attributes.module';

@Module({
	controllers: [ProductAttributesController],
	providers: [ProductAttributesService],
	imports: [
		TypeOrmModule.forFeature([ProductAttribute]),
		ProductsModule,
		AttributesModule,
	],
	exports: [ProductAttributesService],
})
export class ProductAttributesModule {}
