import { CartItem } from 'src/cart-items/entities/cart-item.entity';
import { BaseEntity } from 'src/core/database/base.entity';
import { OderItem } from 'src/oder-items/entities/oder-item.entity';
import { ProductVariantsValue } from 'src/product-variants-value/entities/product-variants-value.entity';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
@Entity('productVariants')
export class ProductVariant extends BaseEntity {
	@Column()
	sku: string;

	@Column()
	price: number;

	@Column()
	stock: number;

	@ManyToOne(() => Product, (product) => product.productVariants, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'productId' })
	productId: Product;

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
