
import { BaseEntity } from 'src/core/database/base.entity';
import { Cart } from 'src/modules/carts/entities/cart.entity';
import { ProductVariant } from 'src/modules/product-variants/entities/product-variant.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
@Entity('cartItems')
export class CartItem extends BaseEntity {
	@ManyToOne(() => Cart, (cart) => cart.cartItems, {
		nullable: true,
	})
	@JoinColumn({ name: 'cartId' })
	cart: Cart;

	@ManyToOne(
		() => ProductVariant,
		(productVariant) => productVariant.cartItems,
		{
			eager: true,
		},
	)
	@JoinColumn({ name: 'variantId' })
	productVariant: ProductVariant;
}
 