import { BaseEntity } from 'src/core/database/base.entity';
// import { Product } from 'src/products/entities/product.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'categories' })
export class Category extends BaseEntity {
	@Column()
	name: string;

	@Column()
	desc: string;

	// @OneToMany(() => Product, (product) => product.category)
	// products: Product[];
}
