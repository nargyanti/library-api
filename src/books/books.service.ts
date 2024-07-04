import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) { }

  create(createBookDto: CreateBookDto) {
    return this.prisma.book.create({ data: createBookDto });
  }

  findAll() {
    // TODO: return book where book is not borrowed by member
    return this.prisma.book.findMany();
  }

  // TODO: loaned books based on isReturned is false
  findAllLoaned() {
    return this.prisma.book.findMany({ where: { stock: 0 } });
  }

  findOne(id: number) {
    return this.prisma.book.findUnique({ where: { id } });
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.prisma.book.update({ where: { id }, data: updateBookDto });
  }

  remove(id: number) {
    return this.prisma.book.delete({ where: { id } });
  }
}
