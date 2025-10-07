import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from '../auth/entities/auth.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	imports: [TypeOrmModule.forFeature([Auth])],
	exports: [UsersService],
})
export class UsersModule {}
