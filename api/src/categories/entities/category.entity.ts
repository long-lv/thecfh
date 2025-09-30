import { BaseEntity } from 'src/core/database/base.entity';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('categories')
export class Category extends BaseEntity {
	@Column({ unique: true })
	name: string;

	@Column()
	description: string;

	@OneToMany(() => Product, (product) => product.categoryId)
	products: Product[];
}
