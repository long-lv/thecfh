import { BaseEntity } from 'src/core/database/base.entity';
import { Oder } from 'src/modules/oders/entities/oder.entity';
import { ProductVariant } from 'src/modules/product-variants/entities/product-variant.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('oderItems')
export class OderItem extends BaseEntity {
	@Column()
	quantity: number;

	@Column()
	price: number;

	@ManyToOne(() => Oder, (oder) => oder.oderItems, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'oderId' })
	oders: Oder;

	@ManyToOne(
		() => ProductVariant,
		(productVariant) => productVariant.oderItems,
		{
			onDelete: 'CASCADE',
		},
	)
	@JoinColumn({ name: 'variant_id' })
	productVariant: ProductVariant;
}
