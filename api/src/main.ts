import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfig } from './config/app.config';
import { setupSwagger } from './config/swagger.config';
import * as dotenv from 'dotenv';
// config env;
dotenv.config();

console.log(process.env.DB_HOST, '<<< DB_HOST');
async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	if (appConfig.cors) {
		app.enableCors();
	}

	// swapper
	setupSwagger(app);
	// run src
	await app.listen(appConfig.port, () => {
		console.log(`🚀 TheCFH running at: http://localhost:${appConfig.port}`);
		console.log(
			`📖 Swagger docs available at: http://localhost:${appConfig.port}/docs`,
		);
	});
}

bootstrap();
