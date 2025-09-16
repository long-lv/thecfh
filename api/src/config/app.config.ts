import { ENV } from './env.config';

export const appConfig = {
	port: ENV.PORT || 3000,
	cors: true,
};
