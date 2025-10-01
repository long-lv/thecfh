import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/core/database/base.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('categories')
export class Category extends BaseEntity {
	@ApiProperty({ example: 'Furniture', description: 'Category name' })
	@Column({ unique: true })
	name: string;

	@ApiProperty({
		example: 'Furniture is chair, table,...',
		description: 'Category description',
	})
	@Column()
	description: string;

	@OneToMany(() => Product, (product) => product.categoryId)
	products: Product[];
}
