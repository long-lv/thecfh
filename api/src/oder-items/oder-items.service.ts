import { Injectable } from '@nestjs/common';
import { CreateOderItemDto } from './dto/create-oder-item.dto';
import { UpdateOderItemDto } from './dto/update-oder-item.dto';

@Injectable()
export class OderItemsService {
  create(createOderItemDto: CreateOderItemDto) {
    return 'This action adds a new oderItem';
  }

  findAll() {
    return `This action returns all oderItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} oderItem`;
  }

  update(id: number, updateOderItemDto: UpdateOderItemDto) {
    return `This action updates a #${id} oderItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} oderItem`;
  }
}
