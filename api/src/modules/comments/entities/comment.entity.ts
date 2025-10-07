import { BaseEntity } from 'src/core/database/base.entity';
import { Auth } from 'src/modules/auth/entities/auth.entity';
import { Post } from 'src/modules/posts/entities/post.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('comments')
export class Comment extends BaseEntity {
	@Column()
	content: string;

	@ManyToOne(() => Auth, (auth) => auth.comments, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'userId' })
	user: Auth;

	@ManyToOne(() => Post, (post) => post.comments, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'postId' })
	post: Post;

	@OneToMany(() => Comment, (reply) => reply.parent)
	replies: Comment[];

	@ManyToOne(() => Comment, (parent) => parent.replies, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'parentId' })
	parent: Comment;
}
