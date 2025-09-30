import { BaseEntity } from "src/core/database/base.entity";
import { Column, Entity } from "typeorm";

@Entity('inquiries')
export class Inquiry extends BaseEntity {
	@Column()
	subject: string;

	@Column()
	body: string;
}
