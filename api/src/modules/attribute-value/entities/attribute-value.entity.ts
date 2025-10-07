import { BaseEntity } from 'src/core/database/base.entity';
import { Attribute } from 'src/modules/attributes/entities/attibute.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
@Entity('attributeValues')
export class AttributeValue extends BaseEntity {
	@Column()
	value: string;

	@Column()
	attributeId: number;

	@ManyToOne(() => Attribute, (attribute) => attribute.attributeValues)
	@JoinColumn({ name: 'attributeId' })
	attribute: Attribute;
}
