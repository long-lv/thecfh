import { BaseEntity } from 'src/core/database/base.entity';
import { ProductAttributeValue } from 'src/modules/product-attribute-values/entities/product-attribute-value.entity';
import { ProductVariant } from 'src/modules/product-variants/entities/product-variant.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('productVariantsValues')
export class ProductVariantsValue extends BaseEntity {
	@Column()
	variantId: number;

	@Column()
	attributeValueId: number;

	@ManyToOne(
		() => ProductVariant,
		(productVariant) => productVariant.productVariantValues,
		{
			onDelete: 'CASCADE',
		},
	)
	@JoinColumn({ name: 'variantId' })
	productVariant: ProductVariant;
	@ManyToOne(
		() => ProductAttributeValue,
		(productAttrVal) => productAttrVal.variantValues,
		{
			onDelete: 'CASCADE',
		},
	)
	@JoinColumn({ name: 'attributeValueId' })
	productAttrValue: ProductAttributeValue;
}
