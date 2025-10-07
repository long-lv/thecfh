import { BaseEntity } from 'src/core/database/base.entity';
import { AttributeValue } from 'src/modules/attribute-value/entities/attribute-value.entity';
import { ProductAttribute } from 'src/modules/product-attributes/entities/product-attribute.entity';
import { ProductVariantsValue } from 'src/modules/product-variants-value/entities/product-variants-value.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('productAttributeValues')
export class ProductAttributeValue extends BaseEntity {
	@Column()
	attributeValueId: number;

	@ManyToOne(() => AttributeValue, { eager: true })
	@JoinColumn({ name: 'attributeValueId' })
	attributeValue: AttributeValue;

	@Column()
	productAttributeId: number;

	@ManyToOne(
		() => ProductAttribute,
		(productAttr) => productAttr.productAttrValues,
		{ onDelete: 'CASCADE' },
	)
	@JoinColumn({ name: 'productAttributeId' })
	productAttr: ProductAttribute;

	@OneToMany(
		() => ProductVariantsValue,
		(variantVal) => variantVal.productAttrValue,
	)
	variantValues: ProductVariantsValue[];
}
