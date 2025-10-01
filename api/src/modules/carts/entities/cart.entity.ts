import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/core/database/base.entity';
import { Auth } from 'src/modules/auth/entities/auth.entity';
import { CartItem } from 'src/modules/cart-items/entities/cart-item.entity';
import { StatusCart } from '../type/cart.type';
@Entity('Carts')
export class Cart extends BaseEntity {
	@Column({
		type: 'enum',
		enum: StatusCart,
		default: StatusCart.ACTIVE,
	})
	status: string;

	@ManyToOne(() => Auth, (auth) => auth.carts, {
		nullable: true,
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'userId' })
	user: Auth;

	@OneToMany(() => CartItem, (cartItem) => cartItem.cart, {
		cascade: true,
	})
	cartItems: CartItem[];
}
