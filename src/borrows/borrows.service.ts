import { Injectable } from '@nestjs/common';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BorrowsService {
  constructor(private prisma: PrismaService) { }

  create(createBorrowDto: CreateBorrowDto) {
    return this.prisma.borrow.create({ data: createBorrowDto });
  }

  findAll() {
    return this.prisma.borrow.findMany();
  }

  findOne(id: number) {
    return this.prisma.borrow.findUnique({ where: { id } });
  }

  update(id: number, updateBorrowDto: UpdateBorrowDto) {
    return this.prisma.borrow.update({ where: { id }, data: updateBorrowDto });
  }

  remove(id: number) {
    return this.prisma.borrow.delete({ where: { id } });
  }
}
