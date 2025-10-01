import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { StatusCart } from '../type/cart.type';
import { Auth } from 'src/auth/entities/auth.entity';
import { CartItem } from 'src/cart-items/entities/cart-item.entity';
import { BaseEntity } from 'src/core/database/base.entity';
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
