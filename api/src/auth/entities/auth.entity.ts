import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { Role } from '../type/user.type';
@Entity()
export class Auth {
	@PrimaryGeneratedColumn()
	id: number;

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
