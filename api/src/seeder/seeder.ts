import { TypeOrmModule } from '@nestjs/typeorm';
import { seeder } from 'nestjs-seeder';
import { databaseConfig } from 'src/config/db.config';
import { Auth } from 'src/modules/auth/entities/auth.entity';
import { Category } from 'src/modules/categories/entities/category.entity';
import { AdminSeeder } from './admins.seeder';
import { CategoriesSeeder } from './categories.seeder';
import { UserSeeder } from './users.seeder';

seeder({
	imports: [
		TypeOrmModule.forRoot(databaseConfig),
		TypeOrmModule.forFeature([Auth, Category]),
	],
}).run([UserSeeder, AdminSeeder, CategoriesSeeder]);
