import { Column, Entity, OneToMany } from 'typeorm';
import { Role } from '../type/user.type';
import { BaseEntity } from 'src/core/database/base.entity';
import { Cart } from 'src/modules/carts/entities/cart.entity';
import { Oder } from 'src/modules/oders/entities/oder.entity';
import { Inquiry } from 'src/modules/inquiries/entities/inquiry.entity';
import { Chat } from 'src/modules/chats/entities/chat.entity';
import { Post } from 'src/modules/posts/entities/post.entity';
import { Comment } from 'src/modules/comments/entities/comment.entity';
@Entity('users')
export class Auth extends BaseEntity {
	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column({
		type: 'enum',
		enum: Role,
		default: Role.USER,
	})
	role: Role;

	@OneToMany(() => Cart, (cart) => cart.user)
	carts: Cart[];
	
	@OneToMany(() => Oder, (oder) => oder.user)
	oders: Oder[];

	@OneToMany(() => Post, (post) => post.author)
	posts: Post[];

	@OneToMany(() => Comment, (comment) => comment.user)
	comments: Comment[];

	@OneToMany(() => Inquiry, (inquiry) => inquiry.sender)
	senderInquiries: Inquiry[];

	@OneToMany(() => Inquiry, (inquiry) => inquiry.receiver)
	receiverInquiries: Inquiry[];
	
	@OneToMany(() => Chat, (chat) => chat.senderId)
	senderChats: Chat[];

	@OneToMany(() => Chat, (chat) => chat.receiverId)
	receiverChats: Chat[];
}
