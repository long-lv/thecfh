import { Test, TestingModule } from '@nestjs/testing';
import { ProductVariantsValueService } from './product-variants-value.service';

describe('ProductVariantsValueService', () => {
  let service: ProductVariantsValueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductVariantsValueService],
    }).compile();

    service = module.get<ProductVariantsValueService>(ProductVariantsValueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
