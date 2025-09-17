import { Test, TestingModule } from '@nestjs/testing';
import { ProductVariantsValueController } from './product-variants-value.controller';
import { ProductVariantsValueService } from './product-variants-value.service';

describe('ProductVariantsValueController', () => {
  let controller: ProductVariantsValueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductVariantsValueController],
      providers: [ProductVariantsValueService],
    }).compile();

    controller = module.get<ProductVariantsValueController>(ProductVariantsValueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
