import { PartialType } from '@nestjs/swagger';
import { CreateOderItemDto } from './create-oder-item.dto';

export class UpdateOderItemDto extends PartialType(CreateOderItemDto) {}
