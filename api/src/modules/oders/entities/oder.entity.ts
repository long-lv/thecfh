import { BaseEntity } from 'src/core/database/base.entity';
import { Auth } from 'src/modules/auth/entities/auth.entity';
import { OderItem } from 'src/modules/oder-items/entities/oder-item.entity';
import { ProductVariant } from 'src/modules/product-variants/entities/product-variant.entity';
import { Status_oder } from 'src/oders/type/oder.type';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('oders')
export class Oder extends BaseEntity {
	@Column({
		type: 'enum',
		enum: Status_oder,
		default: Status_oder.CONFIRM,
	})
	status: Status_oder;

	@Column()
	totalPrice: number;

	@ManyToOne(() => Auth, (auth) => auth.oders, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'userId' })
	user: Auth;

	@OneToMany(() => OderItem, (oderItem) => oderItem.oders, {
		cascade: true,
	})
	oderItems: OderItem[];

	@OneToMany(
		() => ProductVariant,
		(productVariant) => productVariant.oderItems,
		{
			cascade: true,
		},
	)
	@JoinColumn({ name: 'variantId' })
	productVariant: ProductVariant[];
}
