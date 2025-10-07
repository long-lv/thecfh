import { BaseEntity } from 'src/core/database/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('attributes')
export class Attribute extends BaseEntity {
	@Column({ unique: true })
	name: string;
}
