import { BaseEntity } from 'src/core/database/base.entity';
import { AttributeValue } from 'src/modules/attribute-value/entities/attribute-value.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('attributes')
export class Attribute extends BaseEntity {
	@Column({ unique: true })
	name: string;

	@OneToMany(() => AttributeValue, (attributeValue) => attributeValue.attribute)
	attributeValues: AttributeValue[];
}
