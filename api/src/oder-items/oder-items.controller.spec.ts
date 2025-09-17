import { Test, TestingModule } from '@nestjs/testing';
import { OderItemsController } from './oder-items.controller';
import { OderItemsService } from './oder-items.service';

describe('OderItemsController', () => {
  let controller: OderItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OderItemsController],
      providers: [OderItemsService],
    }).compile();

    controller = module.get<OderItemsController>(OderItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
