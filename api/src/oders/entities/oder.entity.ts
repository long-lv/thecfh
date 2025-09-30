import { BaseEntity } from "src/core/database/base.entity";
import { Column, Entity } from "typeorm";
import { Status_oder } from "../type/oder.type";

@Entity('oders')
export class Oder extends BaseEntity {
	@Column({
		type: 'enum',
		enum: Status_oder,
		default: Status_oder.CONFIRM,
	})
	status: Status_oder;

	@Column()
	totalPrice: number;
}
