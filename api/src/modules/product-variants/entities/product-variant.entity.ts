import { BaseEntity } from 'src/core/database/base.entity';
import { CartItem } from 'src/modules/cart-items/entities/cart-item.entity';
import { OderItem } from 'src/modules/oder-items/entities/oder-item.entity';
import { ProductVariantsValue } from 'src/modules/product-variants-value/entities/product-variants-value.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
@Entity('productVariants')
export class ProductVariant extends BaseEntity {
	@Column()
	sku: string;

	@Column()
	price: number;

	@Column()
	stock: number;

	@Column()
	productId: number;

	@ManyToOne(() => Product, (product) => product.productVariants, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'productId' })
	product: Product;

	@OneToMany(
		() => ProductVariantsValue,
		(productVariantVal) => productVariantVal.productVariant,
	)
	productVariantValues: ProductVariantsValue[];

	@OneToMany(() => CartItem, (cartItem) => cartItem.productVariant, {
		cascade: true,
	})
	cartItems: CartItem[];

	@OneToMany(() => OderItem, (oderItem) => oderItem.productVariant)
	oderItems: OderItem[];
}
