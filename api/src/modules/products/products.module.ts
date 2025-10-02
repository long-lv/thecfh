import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CategoriesModule } from '../categories/categories.module';
import { Category } from '../categories/entities/category.entity';
import { UploadsModule } from '../uploads/uploads.module';

@Module({
	controllers: [ProductsController],
	providers: [ProductsService],
	imports: [
		// Register repositories for Product and Category entities
		// so that @InjectRepository(Product) and @InjectRepository(Category)
		// can be used inside this module's providers (e.g. ProductsService).
		TypeOrmModule.forFeature([Product, Category]),

		// Import CategoriesModule so we can also use CategoriesService
		// (not just the repository) in ProductsService or other providers.
		CategoriesModule,
		UploadsModule,
	],
	exports: [ProductsService],
})
export class ProductsModule {}
