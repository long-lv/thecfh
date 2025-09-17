import { DataSource } from 'typeorm';
import { databaseConfig } from './config/db.config';

export const AppDataSource = new DataSource(databaseConfig);
