import { Auth } from 'src/auth/entities/auth.entity';
import { BaseEntity } from 'src/core/database/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('chats')
export class Chat extends BaseEntity {
	@ManyToOne(() => Auth, (user) => user.senderChats)
	@JoinColumn({ name: 'senderId' })
	senderId: Auth;

	@ManyToOne(() => Auth, (user) => user.receiverChats)
	@JoinColumn({ name: 'receiverId' })
	receiverId: Auth;

	@Column()
	message: string;
}
