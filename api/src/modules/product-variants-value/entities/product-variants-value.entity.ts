import { BaseEntity } from 'src/core/database/base.entity';
import { ProductAttributeValue } from 'src/modules/product-attribute-values/entities/product-attribute-value.entity';
import { ProductVariant } from 'src/modules/product-variants/entities/product-variant.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('productVariantsValues')
export class ProductVariantsValue extends BaseEntity {
	@ManyToOne(
		() => ProductVariant,
		(productVariant) => productVariant.productVariantValues,
		{
			onDelete: 'CASCADE',
		},
	)
	@JoinColumn({ name: 'vaariantId' })
	productVariant: ProductVariant;

	@ManyToOne(
		() => ProductAttributeValue,
		(productAttrVal) => productAttrVal.variantValues,
		{
			onDelete: 'CASCADE',
		},
	)
	@JoinColumn({ name: 'attributValueId' })
	productAttrValue: ProductAttributeValue;
}
