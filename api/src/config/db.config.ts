import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { ENV } from './env.config';

export const databaseConfig: SequelizeModuleOptions = {
	dialect: 'mysql',
	host: ENV.DB_HOST,
	port: Number(ENV.DB_PORT) || 3306,
	username: ENV.DB_USER,
	password: ENV.DB_PASS,
	database: ENV.DB_NAME,
	autoLoadModels: true,
	synchronize: true,
};
