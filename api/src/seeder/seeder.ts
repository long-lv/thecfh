import { TypeOrmModule } from '@nestjs/typeorm';
import { seeder } from 'nestjs-seeder';
import { databaseConfig } from 'src/config/db.config';
import { Auth } from 'src/modules/auth/entities/auth.entity';
import { AdminSeeder } from './admins.seeder';
import { UserSeeder } from './users.seeder';

seeder({
	imports: [
		TypeOrmModule.forRoot(databaseConfig),
		TypeOrmModule.forFeature([Auth]),
	],
}).run([UserSeeder, AdminSeeder]);
