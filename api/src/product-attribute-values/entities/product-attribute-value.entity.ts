import { BaseEntity } from 'src/core/database/base.entity';
import { ProductAttribute } from 'src/product-attributes/entities/product-attribute.entity';
import { ProductVariantsValue } from 'src/product-variants-value/entities/product-variants-value.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('productAttributeValues')
export class ProductAttributeValue extends BaseEntity {
	@Column()
	attributeId: number;

	@Column()
	value: string;

	@ManyToOne(
		() => ProductAttribute,
		(productAttr) => productAttr.productAttrValues,
		{
			onDelete: 'CASCADE',
		},
	)
	@JoinColumn({ name: 'attributeId' })
	productAttr: ProductAttribute;

	@OneToMany(
		() => ProductVariantsValue,
		(productVariantsVal) => productVariantsVal.productAttrValue,
	)
	variantValues: ProductVariantsValue[];
}
