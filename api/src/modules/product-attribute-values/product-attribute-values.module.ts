import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeValueModule } from '../attribute-value/attribute-value.module';
import { ProductAttributesModule } from '../product-attributes/product-attributes.module';
import { ProductAttributeValue } from './entities/product-attribute-value.entity';
import { ProductAttributeValuesController } from './product-attribute-values.controller';
import { ProductAttributeValuesService } from './product-attribute-values.service';

@Module({
	controllers: [ProductAttributeValuesController],
	providers: [ProductAttributeValuesService],
	imports: [TypeOrmModule.forFeature([ProductAttributeValue]), AttributeValueModule, ProductAttributesModule],
	exports: [ProductAttributeValuesService]
})
export class ProductAttributeValuesModule {}
