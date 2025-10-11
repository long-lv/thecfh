import { Module } from '@nestjs/common';
import { AttributeValueService } from './attribute-value.service';
import { AttributeValueController } from './attribute-value.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeValue } from './entities/attribute-value.entity';
import { AttributesModule } from '../attributes/attributes.module';

@Module({
	controllers: [AttributeValueController],
	providers: [AttributeValueService],
	imports: [TypeOrmModule.forFeature([AttributeValue]), AttributesModule],
	exports: [AttributeValueService],
})
export class AttributeValueModule {}
