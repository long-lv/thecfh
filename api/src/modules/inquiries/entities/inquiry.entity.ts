import { BaseEntity } from 'src/core/database/base.entity';
import { Auth } from 'src/modules/auth/entities/auth.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('inquiries')
export class Inquiry extends BaseEntity {
	@Column()
	subject: string;

	@Column()
	body: string;

	@ManyToOne(() => Auth, (auth) => auth.senderInquiries, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'senderId' })
	sender: Auth;

	@ManyToOne(() => Auth, (auth) => auth.receiverInquiries, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'receiverId' })
	receiver: Auth;
}
