import { Module } from '@nestjs/common';
import { OderItemsService } from './oder-items.service';
import { OderItemsController } from './oder-items.controller';

@Module({
  controllers: [OderItemsController],
  providers: [OderItemsService],
})
export class OderItemsModule {}
