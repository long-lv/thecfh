import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/db.config';
// import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductsModule } from './modules/products/products.module';
import { ProductAttributesModule } from './modules/product-attributes/product-attributes.module';
import { ProductAttributeValuesModule } from './modules/product-attribute-values/product-attribute-values.module';
import { ProductVariantsModule } from './modules/product-variants/product-variants.module';
import { ProductVariantsValueModule } from './modules/product-variants-value/product-variants-value.module';
import { CartsModule } from './modules/carts/carts.module';
import { CartItemsModule } from './modules/cart-items/cart-items.module';
import { OdersModule } from './modules/oders/oders.module';
import { OderItemsModule } from './modules/oder-items/oder-items.module';
import { PostsModule } from './modules/posts/posts.module';
import { CommentsModule } from './modules/comments/comments.module';
import { BannersModule } from './modules/banners/banners.module';
import { InquiriesModule } from './modules/inquiries/inquiries.module';
import { ChatsModule } from './modules/chats/chats.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { UsersModule } from './modules/users/users.module';
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
		UploadsModule,
		UsersModule,
		// ConfigModule.forRoot({ isGlobal: true }),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
