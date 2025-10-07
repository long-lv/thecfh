import { BaseEntity } from 'src/core/database/base.entity';
import { Attribute } from 'src/modules/attributes/entities/attibute.entity';
import { ProductAttributeValue } from 'src/modules/product-attribute-values/entities/product-attribute-value.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('productAttributes')
export class ProductAttribute extends BaseEntity {
	@Column()
	productId: number;

	@ManyToOne(() => Product, (product) => product.productAttrs, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'productId' })
	product: Product;

	@Column()
	attributeId: number;

	@ManyToOne(() => Attribute, { eager: true })
	@JoinColumn({ name: 'attributeId' })
	attribute: Attribute;

	@OneToMany(
		() => ProductAttributeValue,
		(productAttrValue) => productAttrValue.productAttr,
	)
	productAttrValues: ProductAttributeValue[];
}
