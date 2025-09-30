import { BaseEntity } from "src/core/database/base.entity";
import { Column } from "typeorm";

export class Comment extends BaseEntity {
	@Column()
	content: string;
}
