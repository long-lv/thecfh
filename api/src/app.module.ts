import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './config/db.config';
// import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		SequelizeModule.forRoot(databaseConfig),
		AuthModule,
		// ConfigModule.forRoot({ isGlobal: true }),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
