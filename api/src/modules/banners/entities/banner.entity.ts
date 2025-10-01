import { BaseEntity } from 'src/core/database/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('banners')
export class Banner extends BaseEntity {
	@Column({ unique: true })
	title: string;

	@Column()
	image_url?: string;

	@Column()
	link_url?: string;

	@Column()
	content?: string;
}
