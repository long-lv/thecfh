import { BaseEntity } from "src/core/database/base.entity";
import { Column } from "typeorm";

export class ProductVariant extends BaseEntity {
	@Column()
	sku: string;

	@Column()
	price: number;

	@Column()
	stock: number;
}
