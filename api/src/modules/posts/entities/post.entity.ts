import { BaseEntity } from 'src/core/database/base.entity';
import { Auth } from 'src/modules/auth/entities/auth.entity';
import { Comment } from 'src/modules/comments/entities/comment.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('posts')
export class Post extends BaseEntity {
	@Column({ unique: true })
	title: string;

	@Column()
	content: string;

	@ManyToOne(() => Auth, (auth) => auth.posts)
	@JoinColumn({ name: 'authorId' })
	author: Auth;

	@OneToMany(() => Comment, (cmt) => cmt.post, {
		cascade: true,
		onDelete: 'CASCADE',
	})
	comments: Comment[];
}
