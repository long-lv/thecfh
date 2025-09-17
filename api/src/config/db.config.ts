import { ENV } from './env.config';
import { DataSourceOptions } from 'typeorm';

export const databaseConfig: DataSourceOptions = {
	type: 'mysql',
	host: ENV.DB_HOST,
	port: Number(ENV.DB_PORT) || 3306,
	username: ENV.DB_USER,
	password: ENV.DB_PASS,
	database: ENV.DB_NAME,
	entities: [__dirname + '/../**/*.entity.{js,ts}'],
	migrations: [__dirname + '/../migrations/*{.ts,.js}'],
	synchronize: false,
};
