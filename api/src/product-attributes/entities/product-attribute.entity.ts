import { BaseEntity } from 'src/core/database/base.entity';
import { ProductAttributeValue } from 'src/product-attribute-values/entities/product-attribute-value.entity';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('productAttributes')
export class ProductAttribute extends BaseEntity {
	@Column()
	productId: number;

	@Column()
	name: string;

	@ManyToOne(() => Product, (product) => product.productAttrs, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'productId' })
	product: Product;

	@OneToMany(
		() => ProductAttributeValue,
		(productAttrValue) => productAttrValue.attributeId,
	)
	productAttrValues: ProductAttributeValue[];
}
