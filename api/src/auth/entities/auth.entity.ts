import { Column, Entity, OneToMany } from 'typeorm';
import { Role } from '../type/user.type';
import { BaseEntity } from 'src/core/database/base.entity';
import { Cart } from 'src/carts/entities/cart.entity';
import { Chat } from 'src/chats/entities/chat.entity';
import { Oder } from 'src/oders/entities/oder.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Inquiry } from 'src/inquiries/entities/inquiry.entity';
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
	carts: Cart[] = [];
	
	@OneToMany(() => Oder, (oder) => oder.user)
	oders: Oder[] = [];

	@OneToMany(() => Post, (post) => post.authorId)
	posts: Post[] = [];

	@OneToMany(() => Comment, (comment) => comment.userId)
	comments: Comment[] = [];

	@OneToMany(() => Inquiry, (inquiry) => inquiry.senderId)
	senderInquiries: Inquiry[] = [];

	@OneToMany(() => Inquiry, (inquiry) => inquiry.receiverId)
	receiverInquiries: Inquiry[] = [];
	
	@OneToMany(() => Chat, (chat) => chat.senderId)
	senderChats: Chat[] = [];

	@OneToMany(() => Chat, (chat) => chat.receiverId)
	receiverChats: Chat[] = [];
}
