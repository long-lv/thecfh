import { Test, TestingModule } from '@nestjs/testing';
import { ProductAttributeValuesController } from './product-attribute-values.controller';
import { ProductAttributeValuesService } from './product-attribute-values.service';

describe('ProductAttributeValuesController', () => {
  let controller: ProductAttributeValuesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductAttributeValuesController],
      providers: [ProductAttributeValuesService],
    }).compile();

    controller = module.get<ProductAttributeValuesController>(ProductAttributeValuesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
