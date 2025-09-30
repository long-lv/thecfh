import { Cart } from 'src/carts/entities/cart.entity';
import { ProductVariant } from 'src/product-variants/entities/product-variant.entity';
import { BaseEntity, Entity, JoinColumn, ManyToOne } from 'typeorm';
@Entity('cartItems')
export class CartItem extends BaseEntity {
	@ManyToOne(() => Cart, (cart) => cart.cartItems, {
		nullable: true,
	})
	@JoinColumn({ name: 'cartId' })
	cart: Cart;
	
	@ManyToOne(() => ProductVariant, (productVariant) => productVariant.cartItems, {
		eager: true
	})
	@JoinColumn({ name: 'variantId' })
	productVariant: ProductVariant;
}
