import { BaseEntity } from "src/core/database/base.entity";
import { Column } from "typeorm";

export class Post extends BaseEntity {
	@Column({ unique: true })
	title: string;

	@Column()
	content: string;

}
