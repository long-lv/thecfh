import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfig } from './config/app.config';
import { setupSwagger } from './config/swagger.config';
import * as dotenv from 'dotenv';
import { HttpErrorFilter } from './core/filter/httpError.filter';
import { TransformResponseInterceptor } from './interceptors/transform-response.interceptor';
// config env;
dotenv.config();

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	if (appConfig.cors) {
		app.enableCors();
	}

	// setting filter http request
	app.useGlobalFilters(new HttpErrorFilter());

	// interceptor (success response)
	app.useGlobalInterceptors(new TransformResponseInterceptor());
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
