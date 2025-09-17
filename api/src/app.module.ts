import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/db.config';
// import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { ProductAttributesModule } from './product-attributes/product-attributes.module';
import { ProductAttributeValuesModule } from './product-attribute-values/product-attribute-values.module';
import { ProductVariantsModule } from './product-variants/product-variants.module';
import { ProductVariantsValueModule } from './product-variants-value/product-variants-value.module';
import { CartsModule } from './carts/carts.module';
import { CartItemsModule } from './cart-items/cart-items.module';
import { OdersModule } from './oders/oders.module';
import { OderItemsModule } from './oder-items/oder-items.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { BannersModule } from './banners/banners.module';
import { InquiriesModule } from './inquiries/inquiries.module';
import { ChatsModule } from './chats/chats.module';
@Module({
	imports: [
		TypeOrmModule.forRoot(databaseConfig),
		AuthModule,
		CategoriesModule,
		ProductsModule,
		ProductAttributesModule,
		ProductAttributeValuesModule,
		ProductVariantsModule,
		ProductVariantsValueModule,
		CartsModule,
		CartItemsModule,
		OdersModule,
		OderItemsModule,
		PostsModule,
		CommentsModule,
		BannersModule,
		InquiriesModule,
		ChatsModule,
		// ConfigModule.forRoot({ isGlobal: true }),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
