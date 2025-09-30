import { BaseEntity } from 'src/core/database/base.entity';
import { Category } from 'src/modules/categories/entities/category.entity';
import { ProductAttribute } from 'src/modules/product-attributes/entities/product-attribute.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('products')
export class Product extends BaseEntity {
	@Column({ unique: true })
	name: string;

	@Column()
	description: string;

	@Column()
	price: string;

	@Column()
	imgUrl: string;

	@Column()
	categoryId: number;

	@ManyToOne(() => Category, (category) => category.products, {
		onDelete: 'CASCADE', // if cateogy deleted, product will also be delected
	})
	@JoinColumn({ name: 'categoryId' })
	category: Category;

	@OneToMany(() => ProductAttribute, (productAttr) => productAttr.productId)
	productAttrs: ProductAttribute[];
}
