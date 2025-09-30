import { Column, Entity } from 'typeorm';
import { Role } from '../type/user.type';
import { BaseEntity } from 'src/core/database/base.entity';
@Entity('users')
export class Auth extends BaseEntity {
	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column({
		type: 'enum',
		enum: Role,
		default: Role.USER,
	})
	role: Role;
}
